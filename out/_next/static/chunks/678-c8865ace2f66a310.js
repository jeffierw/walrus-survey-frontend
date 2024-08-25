(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[678],{9201:function(){},3043:function(e,t,n){"use strict";var o=n(6560),r=n(6098),s=n(7351),l=n(2118),i=n(665);n(7200);var a=n(2873),c=n(2730),d=n(9536),u=n(3521),g=n(9336),h=n(5481);n(9872);var m=n(2001),p=n(712),f=n(5765);t.Z=e=>{var t,n,x;let{}=e,w=(0,r.useRouter)(),v=(0,r.usePathname)(),y=(0,l.Os)(),b="testnet",j=new a.uY({url:(0,c.I)(b)}),S="zklogin-demo.setup",N="zklogin-demo.accounts",k=(0,s.useRef)(function(){{let e=sessionStorage.getItem(N);return e?JSON.parse(e):[]}}()),[L,C]=(0,s.useState)(new Map),[K,P]=(0,s.useState)(""),{loginbox:I,closeLoginbox:Z,openLoginbox:O}=(0,f.R)();async function R(e){var t;let n;P("\uD83D\uDD11 Logging in with ".concat(e,"..."));let{epoch:o}=await j.getLatestSuiSystemState(),r=Number(o)+2,s=new i.r,l=(0,u.yv)(),a=(0,u.NH)(s.getPublicKey(),r,l);t={provider:e,maxEpoch:r,randomness:l.toString(),ephemeralPrivateKey:s.getSecretKey()},sessionStorage.setItem(S,JSON.stringify(t));let c={nonce:a,redirect_uri:window.location.origin,response_type:"id_token",scope:"openid"};if("Google"===e){let e=new URLSearchParams({...c,client_id:"944974081005-ls9455qm61esd9qlu8ovt3pve4hs36hu.apps.googleusercontent.com"});n="https://accounts.google.com/o/oauth2/v2/auth?".concat(e.toString())}window.location.replace(n)}async function _(){let e=window.location.hash.substring(1),t=new URLSearchParams(e).get("id_token");if(!t)return;window.history.replaceState(null,"",window.location.pathname);let n=(0,m.o)(t);if(!n.sub||!n.aud){console.warn("[completeZkLogin] missing jwt.sub or jwt.aud");return}let o="1234567899867",r=(0,g.X)(t,o),s=function(){let e=sessionStorage.getItem(S);return e?JSON.parse(e):null}();if(!s){console.warn("[completeZkLogin] missing session storage data");return}for(let e of(sessionStorage.removeItem(S),k.current))if(r===e.userAddr){console.warn("[completeZkLogin] already logged in with this ".concat(s.provider," account"));return}let l=(function(e){let t=(0,d.fW)(e);return i.r.fromSecretKey(t.secretKey)})(s.ephemeralPrivateKey).getPublicKey(),a=JSON.stringify({maxEpoch:s.maxEpoch,jwtRandomness:s.randomness,extendedEphemeralPublicKey:(0,h.Ao)(l),jwt:t,salt:o.toString(),keyClaimName:"sub"},null,2);console.debug("[completeZkLogin] Requesting ZK proof with:",a),P("⏳ Requesting ZK proof. This can take a few seconds...");let c=await fetch("https://prover-dev.mystenlabs.com/v1",{method:"POST",headers:{"Content-Type":"application/json"},body:a}).then(e=>(console.debug("[completeZkLogin] ZK proving service success"),e.json())).catch(e=>(console.warn("[completeZkLogin] ZK proving service error:",e),null)).finally(()=>{P("")});c&&(function(e){let t=[e,...k.current];sessionStorage.setItem(N,JSON.stringify(t)),k.current=t,A([e])}({provider:s.provider,userAddr:r,zkProofs:c,ephemeralPrivateKey:s.ephemeralPrivateKey,userSalt:o.toString(),sub:n.sub,aud:"string"==typeof n.aud?n.aud:n.aud[0],maxEpoch:s.maxEpoch}),window.location.reload())}async function A(e){if((null==e?void 0:e.length)==0)return;let t=new Map;for(let n of e){let e=await j.getBalance({owner:n.userAddr,coinType:"0x2::sui::SUI"});t.set(n.userAddr,+e.totalBalance/1e9)}C(e=>new Map([...e,...t]))}(0,s.useEffect)(()=>{_(),A(k.current);let e=setInterval(()=>A(k.current),5e3);return()=>{clearInterval(e)}},[]),(0,s.useEffect)(()=>{console.log("test",y),(null==y?void 0:y.connected)&&"/"==v&&w.push("/createSurvey"),(null==y?void 0:y.connected)||w.push("/")},[null==y?void 0:y.connected,v]);let[E,T]=(0,s.useState)("");return(0,o.jsx)("div",{className:"flex gap-2",children:(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:"flex gap-4",children:[!((null===(t=k.current)||void 0===t?void 0:t.length)>0)&&y.connected&&(0,o.jsx)("div",{className:"flex flex-col text-white",children:(0,o.jsx)(l.NL,{label:"Connect with Sui"})}),!y.connected&&!((null===(n=k.current)||void 0===n?void 0:n.length)>0)&&(0,o.jsx)("button",{onClick:O,className:"text-black text-lg bg-white py-3 px-10 rounded-lg",children:"Login"}),I&&!y.connected&&(0,o.jsx)("div",{style:{backgroundColor:"rgba(255, 255, 255, 0.7)"},className:"flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full",id:"popupmodal",children:(0,o.jsx)("div",{className:"relative p-4 lg:w-1/3 w-full max-w-2xl max-h-full",children:(0,o.jsxs)("div",{className:"relative rounded-3xl shadow  bg-gradient-to-b from-[#5de0e6] to-[#004aad] text-white",children:[(0,o.jsx)("div",{className:"flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600",children:(0,o.jsxs)("button",{onClick:Z,type:"button",className:"text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",children:[(0,o.jsx)("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14",children:(0,o.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})}),(0,o.jsx)("span",{className:"sr-only",children:"Close modal"})]})}),(0,o.jsx)("div",{className:"p-4 space-y-4",children:(0,o.jsx)("p",{className:"text-2xl text-center font-bold",style:{color:"#FFB000"},children:"Please connect your Sui Wallet"})}),(0,o.jsxs)("div",{className:"flex flex-col gap-4 items-center p-4 rounded-b pb-20 pt-10 justify-center",children:[(0,o.jsx)("div",{className:"flex text-white w-1/2 justify-center",children:(0,o.jsx)(l.NL,{label:"Connect with Sui"})}),(0,o.jsx)("div",{className:"flex space-x-4 justify-center w-1/2",children:["Google"].map(e=>(0,o.jsx)("button",{className:"btn-login ".concat(e," border border-white px-2 rounded-lg w-full"),onClick:()=>{R(e)},style:{paddingTop:8,paddingBottom:8},children:"Login with Google"},e))})]})]})})}),(null===(x=k.current)||void 0===x?void 0:x.length)>0&&(0,o.jsx)("div",{id:"accounts",className:"section",children:k.current.map(e=>{let t=(0,p.JO)(b,"address",e.userAddr);return(0,o.jsxs)("div",{className:"account text-white",children:[(0,o.jsxs)("div",{children:["Address:"," ",(0,o.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:t,children:(0,p.g5)(e.userAddr,6,6,"0x","...")})]}),(0,o.jsxs)("div",{className:"flex justify-between",children:[(0,o.jsx)("button",{className:"btn-faucet text-green-500 font-bold",onClick:()=>{(0,p.am)(b,e.userAddr),P("\uD83D\uDCB0 Requesting SUI from faucet. This will take a few seconds..."),setTimeout(()=>{P("")},3e3)},children:"Faucet SUI"}),(0,o.jsx)("button",{className:"font-bold",style:{color:"red"},onClick:()=>{sessionStorage.clear(),k.current=[],C(new Map),window.location.href="/"},children:"LOG OUT"})]})]},e.userAddr)})})]})})})}},5765:function(e,t,n){"use strict";n.d(t,{R:function(){return i},V:function(){return l}});var o=n(6560),r=n(7351);let s=(0,r.createContext)(),l=e=>{let{children:t}=e,[n,l]=(0,r.useState)(!1);return(0,o.jsx)(s.Provider,{value:{loginbox:n,openLoginbox:()=>l(!0),closeLoginbox:()=>l(!1),toggleLoginbox:()=>{l(e=>!e)}},children:t})},i=()=>(0,r.useContext)(s)}}]);