"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import '@mysten/dapp-kit/dist/index.css';
import {useWallet} from '@suiet/wallet-kit';
import { message } from 'antd';

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

const FormPage = ({}) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  console.log('test', id);
  const wallet = useWallet();
  const [formTitle, setFormTitle] = useState<string>("New Form");
  const [messageApi, contextHolder] = message.useMessage();
  const [isSubmit, setIsSubmit] = useState(false);
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
      const response = await fetch(`/walrus/${id}`);
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
      
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Create form failed',
      });
    }
  }

  const [formData, setFormData] = useState<FormData | null>(null);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  // 获取表单数据
  useEffect(() => {
    getWalrusData()
  }, [id]);

  // 处理表单提交
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    
  };

  // 处理输入变化
  const handleChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

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
        <div className="absolute right-8 mt-8">
          <Navbar />
        </div>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">new Form</h1>
      <form onSubmit={handleSubmit}>
        {/* {formData.list.map((item) => (
          <div key={item.name} className="mb-4">
            <label htmlFor={item.name} className="block text-gray-700 font-medium mb-2">
              {item.title}
            </label>
            <input
              type="text"
              id={item.name}
              name={item.name}
              value={formValues[item.name] || ""}
              onChange={(e) => handleChange(item.name, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder={item.placeholder || ""}
            />
          </div>
        ))} */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            提交
          </button>
        </div>
      </form>
    </div>
        {/* <div className="flex flex-col items-center pt-12">
          <form id="myForm" onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-4xl font-bold mb-6 border-none focus:outline-none text-center w-full bg-transparent"
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
                className="relative mb-4 w-full group"
              >
                <input
                  type="text"
                  required
                  value={item.value || ""}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder={item.placeholder}
                  className="text-lg w-full p-2 border-gray-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="absolute top-0 right-0 -mt-1 -mr-1 p-1 text-red-500 hover:text-red-700 hidden group-hover:block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addNewField}
              className="text-base px-6 py-2 bg-[#5b91a5] text-black rounded-full transition duration-200"
            >
              Add New Field
            </button>
            <button
              type="submit"
              className="text-base px-6 py-2 bg-[#5b91a5] text-black rounded-md mt-4 transition duration-200"
            >
              Finish
            </button>
          </form>
        </div> */}
      </div>
    </div>
  </main>
  </>
  )
}

export default FormPage