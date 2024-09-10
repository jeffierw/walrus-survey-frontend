"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import '@mysten/dapp-kit/dist/index.css';
import {useWallet} from '@suiet/wallet-kit';
import { message, Spin } from 'antd';
import confetti from 'canvas-confetti';
import { useNavbar } from "../../../context/NavbarContext";

enum ItemType {
  Text = 1,
  Textarea,
  Checkbox,
  Radio,
  Select,
}

interface Item {
  title: string;
  name: string;
  type: ItemType;
  value?: string;
  options?: string[];
  placeholder?: string;
}

interface Form {
  title: string;
  description?: string;
  itemList: Item[];
}

const CreateSurvey = () => {
  const wallet = useWallet();
  const router = useRouter();
  const { openLoginbox } = useNavbar();
  const [spinning, setSpinning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formUrl, setFormUrl] = useState(null);
  const [formTitle, setFormTitle] = useState<string>("New Survey");
  const [messageApi, contextHolder] = message.useMessage();
  const [items, setItems] = useState<Item[]>([
    {
      title: "Question 1",
      name: "question1",
      type: ItemType.Text,
      placeholder: "Question 1",
    },
  ]);

  const addNewField = () => {
    if (!wallet.connected) {
      openLoginbox()
      return;
    }
    const newItem: Item = {
      title: `Question ${items.length + 1}`,
      name: `question${items.length + 1}`,
      type: ItemType.Text,
      placeholder: `Question ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index].value = value;
    newItems[index].title = value;
    setItems(newItems);
  };

  const handleRemoveField = (index: number) => {
    // 删除指定索引的字段
    const newItems = items.filter((_, i) => i !== index);

    // 更新剩余字段的 title 和 name
    const updatedItems = newItems.map((item, i) => ({
      ...item,
      title: `Question ${i + 1}`,
      name: `question${i + 1}`,
      placeholder: `Question ${i + 1}`
    }));
    console.log('test', index, newItems, updatedItems);

    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 防止默认提交
    if (!wallet.connected) {
      openLoginbox()
      return;
    }
    // 校验表单内容
    if (items.length === 0) {
      messageApi.open({
        type: 'warning',
        content: 'Please Add New Field',
      });
      return;
    }

    const formData: Object = {
      id: wallet?.account?.address,
      title: formTitle,
      itemList: items.map(({ placeholder, ...rest }) => ({
        ...rest,
        value: "",
      })),
      description: ""
    };

    try {
      setSpinning(true);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader?.read()!;
        if (value) {
          chunks.push(value);
        }
        done = readerDone;
      }

      // 将 Uint8Array[] 转换为单个 Uint8Array
      const combinedChunks = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        combinedChunks.set(chunk, offset);
        offset += chunk.length;
      }

      // 1. 将数据转换为文本
      const text = new TextDecoder().decode(combinedChunks);
      console.log("Text:", text, JSON.parse(text));
      const res = JSON.parse(text)
      
      // const res = {
      //   code: 200,
      //   message: "",
      //   data: "{\"newlyCreated\":{\"blobObject\":{\"id\":\"0x11c12d9e42046d3417c13026dd4e6095b166cc28b31e16a11964d1c1efcbd982\",\"storedEpoch\":0,\"blobId\":\"nX_dlVHNnNai7I8s8gtdlxxtLvOvLisD0BInJwMOh-4\",\"size\":244,\"erasureCodeType\":\"RedStuff\",\"certifiedEpoch\":0,\"storage\":{\"id\":\"0x3481abebcef76c23e2505ee8fcefc8dc1eda8d26b749bad73ddf478bc60975d2\",\"startEpoch\":0,\"endEpoch\":1,\"storageSize\":65023000}},\"encodedSize\":65023000,\"cost\":3175000}}"
      // }
      if (res.code === 200) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setIsSuccess(true);
        const walrusData = JSON.parse(res.data);
        if (walrusData?.newlyCreated) {
          setFormUrl(walrusData.newlyCreated?.blobObject?.blobId)
          console.log('test1', walrusData.newlyCreated?.blobObject?.blobId);
          // router.push(`/form/${walrusData.newlyCreated?.blobObject?.blobId}`);
        } else if (walrusData?.alreadyCertified) {
          setFormUrl(walrusData.alreadyCertified?.blobId)
          console.log('test2', walrusData.alreadyCertified?.blobId);
          // router.push(`/form/${walrusData.alreadyCertified?.blobId}`);
        }
      } else {
        messageApi.open({
          type: 'error',
          content: 'Create Survey Failed',
        });
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Create Survey Failed',
      });
    } finally {
      setSpinning(false);
    }
  };

  const absoluteUrl = formUrl ? `${window.location.origin}/survey?id=${formUrl}` : '';

  return (
    <>
    {contextHolder}
  <main>
    <div className="z-0" 
      style={{backgroundImage: 'url(/form_bg.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
    >
      <div className="min-h-screen">
        <div className="absolute left-8">
          <img src="/logo2.png" className="h-32 mt-4 ml-8" alt="logo" />
        </div>
        <div className="absolute right-8 mt-8 z-10">
          <Navbar />
        </div>
        {isSuccess ? <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-60%] max-w-[720px]">
          <div className="max-w-md w-full">
            <p className="text-3xl text-[#63948c] font-medium text-left leading-relaxed mb-4">
              Congratulations! 🎉 You've created a survey! Copy and paste this <a
              href={absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-center"
            >
               Link
            </a> to share your survey in an email, on a website, or on social media.
            </p>
          </div>
        </div> :
        <div className="flex flex-col items-center pt-12">
          <form id="myForm" onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-4xl font-semibold mb-6 border-none focus:outline-none text-center w-full bg-transparent text-[#63948c]"
              autoFocus
              onFocus={(e) => {
                const val = e.target.value;
                e.target.value = '';
                e.target.value = val;
              }}
            />
            {items.map((item, index) => (
              <div
                key={index}
                className="relative mb-4 w-full group flex items-center"
              >
                <div className="relative w-full flex">
                  <input
                    type="text"
                    required
                    value={item.value || ""}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder={item.placeholder}
                    className="text-lg w-full p-2 border border-gray-100 focus:outline-none focus:border-[#63948c] focus:shadow-sm focus:shadow-gray-300"
                    style={{ paddingRight: "2rem" }}  // 为了给按钮留出空间
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hidden group-hover:block"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7H5m14 0l-1.342 12.195A2 2 0 0115.667 21H8.333a2 2 0 01-1.991-1.805L5 7m4 0V4a1 1 0 011-1h4a1 1 0 011 1v3M10 11v6m4-6v6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            
            ))}
            <div className="mb-4 w-full">
              <button
                type="button"
                onClick={addNewField}
                className="text-base rounded-s px-6 py-2 w-full border border-dotted border-gray-300 bg-white text-[#5b91a5] flex items-center justify-center gap-2 transition duration-200"
              >
                <div className="bg-white p-1 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-[#5b91a5]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                Add New Field
              </button>
            </div>


            <button
              type="submit"
              className="text-base px-16 py-2 bg-[#5b91a5] text-white rounded-full mt-4 transition duration-200"
            >
              Finish
            </button>
          </form>
        </div>
        }
        <Spin spinning={spinning} fullscreen />
      </div>
    </div>
  </main>
  </>
  )
}

export default CreateSurvey