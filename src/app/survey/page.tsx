"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import '@mysten/dapp-kit/dist/index.css';
import {useWallet} from '@suiet/wallet-kit';
import { message, Spin } from 'antd';
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
  itemList: Item[];
}

const FormPage = ({}) => {
  const searchParams = useSearchParams();
  const { openLoginbox } = useNavbar();
  const id = searchParams.get('id');
  console.log('test', id);
  const wallet = useWallet();
  const [formTitle, setFormTitle] = useState<string>("New Survey");
  const [messageApi, contextHolder] = message.useMessage();
  const [isSubmit, setIsSubmit] = useState(false);
  const [spinning, setSpinning] = useState(true);
  const [items, setItems] = useState<Item[]>([
    {
      title: "Question 1",
      name: "question1",
      type: ItemType.Text,
      placeholder: "Question 1",
    },
  ]);

  const getWalrusData = async () => {
    try {      
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/${id}`);
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
      //   "code": 200,
      //   "message": "",
      //   "data": "{\"id\":\"0xaf0e50c4619f5bdbcda69b33807b32088d53c8bcc928e5ee3fb343bb3f37492e\",\"title\":\"test survey\",\"itemList\":[{\"title\":\"test question 1\",\"name\":\"question1\",\"type\":1,\"value\":\"\"},{\"title\":\"test question 2\",\"name\":\"question2\",\"type\":1,\"value\":\"\"}]}"
      // }
      if (res.code === 200) {
        const walrusData = JSON.parse(res.data);
        console.log('===', walrusData);
        setFormData(walrusData);
      } else {
        messageApi.open({
          type: 'error',
          content: 'Get Survey Failed',
        });
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Get Survey Failed',
      });
    } finally{
      setSpinning(false);
    }
  }

  const [formData, setFormData] = useState<Form | null>(null);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  // 获取表单数据
  useEffect(() => {
    getWalrusData()
  }, []);

  // 处理表单提交
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!wallet.connected) {
      openLoginbox()
      return;
    }
    console.log('====', formValues);
    try {
      setSpinning(true)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmit(true)
    } catch (error) {
      
    } finally {
      setSpinning(false)
    }
  };

  // 处理输入变化
  const handleChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const absoluteUrl = `${window.location.origin}/createSurvey`;

  return (
    <>
    {contextHolder}
  <main>
    <div className="z-0" 
      style={{backgroundImage: 'url(/form_bg.png)', backgroundSize: 'cover', minHeight: '100vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
    >
      {spinning && <Spin spinning={spinning} fullscreen />}
        <div className="min-h-screen">
        <div className="absolute left-8">
          <img src="/logo2.png" className="h-32 mt-4 ml-8" alt="logo" />
        </div>
        <div className="absolute right-8 mt-8">
          <Navbar />
        </div>
        {formData?.itemList.length > 0 && (
        isSubmit ? (
          <div className="flex flex-col items-center pt-48 px-4">
            <div className="max-w-md w-full">
              <p className="text-2xl text-[#63948c] font-medium text-left leading-relaxed mb-4">
                Thank you for your participation in this survey! 🎉 Click the {" "}
                <a
                  href={absoluteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-center"
                >
                  Link
                </a>{" "}
                to create your own Web3 survey.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center pt-12">
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
              <h1 className="text-4xl font-semibold mb-6 border-none text-center w-full text-[#63948c]">
                {formData?.title}
              </h1>
              {formData?.itemList.map((item, index) => (
                <div key={index} className="relative mb-4 w-full group">
                  <label htmlFor={item.name} className="block font-medium mb-2 text-[#63948c]">
                    Q{index + 1}: {item.title}
                  </label>
                  <input
                    type="text"
                    id={item.name}
                    name={item.name}
                    required
                    value={formValues[item.name] || ""}
                    onChange={(e) => handleChange(item.name, e.target.value)}
                    className="text-lg w-full p-2 border border-gray-100 focus:outline-none focus:border-[#63948c] focus:shadow-sm focus:shadow-gray-300"
                    placeholder={item.placeholder || ""}
                  />
                </div>
              ))}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="text-base px-16 py-2 bg-[#5b91a5] text-white rounded-full transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )
      )}      
        </div>
    </div>
  </main>
  </>
  )
}

export default FormPage