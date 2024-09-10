"use client";
import { useRouter, usePathname } from 'next/navigation';
import axios from "axios";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import {ConnectButton} from '@suiet/wallet-kit';

import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { Keypair, PublicKey } from "@mysten/sui.js/cryptography";
import { TransactionBlock } from "@mysten/sui.js/transactions"

import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import {
  SerializedSignature,
  decodeSuiPrivateKey,
} from "@mysten/sui.js/cryptography";

import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/zklogin";
import { jwtDecode } from "jwt-decode";
import {
  NetworkName,
  makeExplorerUrl,
  requestSuiFromFaucet,
  shortenSuiAddress,
} from "@polymedia/suits";
// import { Modal, isLocalhost } from "@polymedia/webutils";
import {useWallet} from '@suiet/wallet-kit'
import { useEffect, useRef } from "react";
import { useNavbar } from '../context/NavbarContext';

const Navbar = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const wallet = useWallet();
  const NETWORK: NetworkName = "testnet";
  const MAX_EPOCH = 2; // keep ephemeral keys active for this many Sui epochs from now (1 epoch ~= 24h)

  const suiClient = new SuiClient({
    url: getFullnodeUrl(NETWORK),
  });

  /* Session storage keys */

  const setupDataKey = "zklogin-demo.setup";
  const accountDataKey = "zklogin-demo.accounts";

  /* Types */

  type OpenIdProvider = "Google";

  type SetupData = {
    provider: OpenIdProvider;
    maxEpoch: number;
    randomness: string;
    ephemeralPrivateKey: string;
  };

  type AccountData = {
    provider: OpenIdProvider;
    userAddr: string;
    zkProofs: any;
    ephemeralPrivateKey: string;
    userSalt: string;
    sub: string;
    aud: string;
    maxEpoch: number;
  };

  const accounts = useRef<AccountData[]>(loadAccounts()); // useRef() instead of useState() because of setInterval()
  const [balances, setBalances] = useState<Map<string, number>>(new Map()); // Map<Sui address, SUI balance>
  const [modalContent, setModalContent] = useState<string>("");
  const { loginbox, closeLoginbox, openLoginbox } = useNavbar();
  useEffect(() => {
    completeZkLogin();
    fetchBalances(accounts.current);
    const interval = setInterval(() => fetchBalances(accounts.current), 5_000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {    
  //   console.log('test', wallet);
    
  //   if (wallet?.connected && pathname == '/') {
  //     router.push('/dashboard');
  //   }
  //   if (!wallet?.connected) {
  //     router.push('/');
  //   }
  // }, [wallet?.connected, pathname]);

  /* zkLogin end-to-end */

  /**
   * Start the zkLogin process by getting a JWT token from an OpenID provider.
   * https://docs.sui.io/concepts/cryptography/zklogin#get-jwt-token
   */
  async function beginZkLogin(provider: OpenIdProvider) {
    setModalContent(`🔑 Logging in with ${provider}...`);

    // Create a nonce
    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + MAX_EPOCH; // the ephemeral key will be valid for MAX_EPOCH from now
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const nonce = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );

    // Save data to session storage so completeZkLogin() can use it after the redirect
    saveSetupData({
      provider,
      maxEpoch,
      randomness: randomness.toString(),
      ephemeralPrivateKey: ephemeralKeyPair.getSecretKey(),
    });

    // Start the OAuth flow with the OpenID provider
    const urlParamsBase = {
      nonce: nonce,
      redirect_uri: window.location.origin,
      response_type: "id_token",
      scope: "openid",
    };
    let loginUrl: string;
    switch (provider) {
      case "Google": {
        const urlParams = new URLSearchParams({
          ...urlParamsBase,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE,
        });
        loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${urlParams.toString()}`;
        break;
      }
    }
    window.location.replace(loginUrl);
  }

  /**
   * Complete the zkLogin process.
   * It sends the JWT to the salt server to get a salt, then
   * it derives the user address from the JWT and the salt, and finally
   * it gets a zero-knowledge proof from the Mysten Labs proving service.
   */
  async function completeZkLogin() {
    // === Grab and decode the JWT that beginZkLogin() produced ===
    // https://docs.sui.io/concepts/cryptography/zklogin#decoding-jwt

    // grab the JWT from the URL fragment (the '#...')
    const urlFragment = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(urlFragment);
    const jwt = urlParams.get("id_token");
    if (!jwt) {
      return;
    }

    // remove the URL fragment
    window.history.replaceState(null, "", window.location.pathname);

    // decode the JWT
    const jwtPayload = jwtDecode(jwt);
    if (!jwtPayload.sub || !jwtPayload.aud) {
      console.warn("[completeZkLogin] missing jwt.sub or jwt.aud");
      return;
    }

    // === Get the salt ===
    // https://docs.sui.io/concepts/cryptography/zklogin#user-salt-management

    // const requestOptions =
    //     config.URL_SALT_SERVICE === 'https://salt.api.mystenlabs.com/get_salt'
    //     ? // dev, using a JSON file (same salt all the time)
    //     {
    //         method: 'GET',
    //     }
    //     : // prod, using an actual salt server
    //     {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ jwt }),
    //     };

    // const saltResponse: { salt: string } | null =
    //     await fetch(config.URL_SALT_SERVICE, requestOptions)
    //     .then(res => {
    //         console.debug('[completeZkLogin] salt service success');
    //         return res.json();
    //     })
    //     .catch((error: unknown) => {
    //         console.warn('[completeZkLogin] salt service error:', error);
    //         return null;
    //     });

    // if (!saltResponse) {
    //     return;
    // }

    const userSalt = "1234567899867";

    // === Get a Sui address for the user ===
    // https://docs.sui.io/concepts/cryptography/zklogin#get-the-users-sui-address

    const userAddr = jwtToAddress(jwt, userSalt);

    // === Load and clear the data which beginZkLogin() created before the redirect ===
    const setupData = loadSetupData();
    if (!setupData) {
      console.warn("[completeZkLogin] missing session storage data");
      return;
    }
    clearSetupData();
    for (const account of accounts.current) {
      if (userAddr === account.userAddr) {
        console.warn(
          `[completeZkLogin] already logged in with this ${setupData.provider} account`
        );
        return;
      }
    }

    // === Get the zero-knowledge proof ===
    // https://docs.sui.io/concepts/cryptography/zklogin#get-the-zero-knowledge-proof

    const ephemeralKeyPair = keypairFromSecretKey(
      setupData.ephemeralPrivateKey
    );
    const ephemeralPublicKey = ephemeralKeyPair.getPublicKey();
    const payload = JSON.stringify(
      {
        maxEpoch: setupData.maxEpoch,
        jwtRandomness: setupData.randomness,
        extendedEphemeralPublicKey:
          getExtendedEphemeralPublicKey(ephemeralPublicKey),
        jwt,
        salt: userSalt.toString(),
        keyClaimName: "sub",
      },
      null,
      2
    );

    console.debug("[completeZkLogin] Requesting ZK proof with:", payload);
    setModalContent("⏳ Requesting ZK proof. This can take a few seconds...");

    const zkProofs = await fetch(process.env.NEXT_PUBLIC_URL_ZK_PROVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    })
      .then((res) => {
        console.debug("[completeZkLogin] ZK proving service success");
        return res.json();
      })
      .catch((error: unknown) => {
        console.warn("[completeZkLogin] ZK proving service error:", error);
        return null;
      })
      .finally(() => {
        setModalContent("");
      });

    if (!zkProofs) {
      return;
    }

    // === Save data to session storage so sendTransaction() can use it ===
    saveAccount({
      provider: setupData.provider,
      userAddr,
      zkProofs,
      ephemeralPrivateKey: setupData.ephemeralPrivateKey,
      userSalt: userSalt.toString(),
      sub: jwtPayload.sub,
      aud:
        typeof jwtPayload.aud === "string" ? jwtPayload.aud : jwtPayload.aud[0],
      maxEpoch: setupData.maxEpoch,
    });
    window.location.reload();
  }

  /**
   * Assemble a zkLogin signature and submit a transaction
   * https://docs.sui.io/concepts/cryptography/zklogin#assemble-the-zklogin-signature-and-submit-the-transaction
   */
  async function sendTransaction(account: AccountData) {
    setModalContent("🚀 Sending transaction...");

    // Sign the transaction bytes with the ephemeral private key
    const txb = new TransactionBlock();
    txb.setSender(account.userAddr);

    const ephemeralKeyPair = keypairFromSecretKey(account.ephemeralPrivateKey);
    const { bytes, signature: userSignature } = await txb.sign({
      client: suiClient,
      signer: ephemeralKeyPair,
    });

    // Generate an address seed by combining userSalt, sub (subject ID), and aud (audience)
    const addressSeed = genAddressSeed(
      BigInt(account.userSalt),
      "sub",
      account.sub,
      account.aud
    ).toString();

    // Serialize the zkLogin signature by combining the ZK proof (inputs), the maxEpoch,
    // and the ephemeral signature (userSignature)
    const zkLoginSignature: SerializedSignature = getZkLoginSignature({
      inputs: {
        ...account.zkProofs,
        addressSeed,
      },
      maxEpoch: account.maxEpoch,
      userSignature,
    });

    // Execute the transaction
    await suiClient
      .executeTransactionBlock({
        transactionBlock: bytes,
        signature: zkLoginSignature,
        options: {
          showEffects: true,
        },
      })
      .then((result) => {
        console.debug(
          "[sendTransaction] executeTransactionBlock response:",
          result
        );
        fetchBalances([account]);
      })
      .catch((error: unknown) => {
        console.warn(
          "[sendTransaction] executeTransactionBlock failed:",
          error
        );
        return null;
      })
      .finally(() => {
        setModalContent("");
      });
  }

  /**
   * Create a keypair from a base64-encoded secret key
   */
  function keypairFromSecretKey(privateKeyBase64: string): Ed25519Keypair {
    const keyPair = decodeSuiPrivateKey(privateKeyBase64);
    return Ed25519Keypair.fromSecretKey(keyPair.secretKey);
  }

  /**
   * Get the SUI balance for each account
   */
  async function fetchBalances(accounts: AccountData[]) {
    if (accounts?.length == 0) {
      return;
    }
    const newBalances = new Map<string, number>();
    for (const account of accounts) {
      const suiBalance = await suiClient.getBalance({
        owner: account.userAddr,
        coinType: "0x2::sui::SUI",
      });
      newBalances.set(
        account.userAddr,
        +suiBalance.totalBalance / 1_000_000_000
      );
    }
    setBalances((prevBalances) => new Map([...prevBalances, ...newBalances]));
  }

  /* Session storage */

  function saveSetupData(data: SetupData) {
    sessionStorage.setItem(setupDataKey, JSON.stringify(data));
  }

  function loadSetupData(): SetupData | null {
    const dataRaw = sessionStorage.getItem(setupDataKey);
    if (!dataRaw) {
      return null;
    }
    const data: SetupData = JSON.parse(dataRaw);
    return data;
  }

  function clearSetupData(): void {
    sessionStorage.removeItem(setupDataKey);
  }

  function saveAccount(account: AccountData): void {
    const newAccounts = [account, ...accounts.current];
    sessionStorage.setItem(accountDataKey, JSON.stringify(newAccounts));
    accounts.current = newAccounts;
    fetchBalances([account]);
  }

  function loadAccounts(): AccountData[] {
    if (typeof window !== "undefined") {
      const dataRaw = sessionStorage.getItem(accountDataKey);
      if (!dataRaw) {
        return [];
      }
      const data: AccountData[] = JSON.parse(dataRaw);
      return data;
    }
  }

  function clearState(): void {
    sessionStorage.clear();
    accounts.current = [];
    setBalances(new Map());
    window.location.href = "/";
  }

  /* HTML */

  const openIdProviders: OpenIdProvider[] = ["Google"];

 
  
 

  const [avatarUrl, setAvatarUrl] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const getRandomNumber = () => Math.floor(Math.random() * 1000);
  //       const apiUrl = `https://api.multiavatar.com/${getRandomNumber()}`;

  //       const response = await axios.get(apiUrl);
  //       const svgDataUri = `data:image/svg+xml,${encodeURIComponent(
  //         response.data
  //       )}`;
  //       setAvatarUrl(svgDataUri);
  //     } catch (error) {
  //       console.error("Error fetching avatar:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="flex gap-2">
      <div>
        <div className="flex gap-4">
          {!(accounts.current?.length > 0) && wallet.connected && (
            <div className="flex flex-col text-white">
              <ConnectButton label="Connect with Sui" />
            </div>
          )}
  
          {!wallet.connected && !(accounts.current?.length > 0) && (
            <button onClick={openLoginbox} className="text-black text-lg bg-white py-3 px-10 rounded-lg">
              Login
            </button>
          )}
  
          {loginbox && !wallet.connected && (
            <div
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
              className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
              id="popupmodal"
            >
              <div className="relative p-4 lg:w-1/3 w-full max-w-2xl max-h-full">
                <div className="relative rounded-3xl shadow  bg-gradient-to-b from-[#5de0e6] to-[#004aad] text-white">
                  <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                    <button
                      onClick={closeLoginbox}
                      type="button"
                      className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
  
                  <div className="p-4 space-y-4">
                    <p className="text-2xl text-center font-bold" style={{ color: '#FFB000' }}>
                      Please connect your Sui Wallet
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 items-center p-4 rounded-b pb-20 pt-10 justify-center">
                    <div className="flex text-white w-1/2 justify-center">
                      <ConnectButton label="Connect with Sui" />
                    </div>
  
                    <div className="flex space-x-4 justify-center w-1/2">
                      {openIdProviders.map((provider) => (
                        <button
                          className={`btn-login ${provider} border border-white px-2 rounded-lg w-full`}
                          onClick={() => {
                            beginZkLogin(provider);
                          }}
                          key={provider}
                          style={{ paddingTop: 8, paddingBottom: 8 }}
                        >
                          Login with Google
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
  
          {accounts.current?.length > 0 && (
            <div id="accounts" className="section">
              {accounts.current.map((acct) => {
                // const balance = balances.get(acct.userAddr);
                const explorerLink = makeExplorerUrl(NETWORK, "address", acct.userAddr);
                return (
                  <div className="account text-white" key={acct.userAddr}>
                    <div>
                      Address:{" "}
                      <a target="_blank" rel="noopener noreferrer" href={explorerLink}>
                        {shortenSuiAddress(acct.userAddr, 6, 6, "0x", "...")}
                      </a>
                    </div>
  
                    {/* <div>
                      Balance:{" "}
                      {typeof balance === "undefined" ? "(loading)" : `${balance} SUI`}
                    </div> */}
  
                    <div className="flex justify-between">
                      <button
                        className="btn-faucet text-green-500 font-bold"
                        onClick={() => {
                          requestSuiFromFaucet(NETWORK, acct.userAddr);
                          setModalContent("💰 Requesting SUI from faucet. This will take a few seconds...");
                          setTimeout(() => {
                            setModalContent("");
                          }, 3000);
                        }}
                      >
                        Faucet SUI
                      </button>
  
                      <button
                        className="font-bold"
                        style={{ color: "red" }}
                        onClick={() => {
                          clearState();
                        }}
                      >
                        LOG OUT
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
  
          {/* {(wallet.connected || (accounts.current?.length > 0)) && (
            <>
              <Link
                href="/passport"
                className="text-white font-bold rounded-lg py-2 px-10 text-lg"
                style={{ backgroundColor: '#640D6B', height:45 }}
              >
                <div className="mt-2">Pet Form</div>
              </Link>
              <Link href="/dashboard">
                {avatarUrl && <img src={avatarUrl} alt="Avatar" style={{ width: 45 }} />}
              </Link>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};


export default Navbar;
