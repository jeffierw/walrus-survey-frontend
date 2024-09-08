"use client";
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import Navbar from "../../../components/Navbar";
import {useWallet} from '@suiet/wallet-kit';
import { Card, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

 
const Dashboard = () => {
 
  const client = new SuiClient({ url: getFullnodeUrl('testnet') });
  const wallet = useWallet();
  const router = useRouter();

  const getFormList = async () => {
    let formList:any = [];
    const res: any = await client.getObject({
      id: "0x56f99f6bddabda730c57fe729d6ff7586093b01e00de876a1766f3da0108ec45",
      options: {
        showBcs: true,
        showContent: true,
        showDisplay: true,
        showOwner: true,
        showPreviousTransaction: true,
        showStorageRebate: true,
        showType: true
      }
    });

    // 检查对象类型是否匹配    
    if (res?.data?.type === `${process.env.NEXT_PUBLIC_CONTRACT_PACKAGE}::suisurvey::State`) {
      const survey_ids = res.data.content?.fields?.all_surveys || [];
      console.log('test1', res.data, survey_ids);
      
      for (const i of survey_ids) {
        const result:any = await client.getObject({
          id: i,
          options: {
            showBcs: true,
            showContent: true,
            showDisplay: true,
            showOwner: true,
            showPreviousTransaction: true,
            showStorageRebate: true,
            showType: true
          }
        });
        console.log('test2', result, wallet?.account?.address);
        if (result.data.content.fields.creator === wallet?.account?.address) {
          formList.push(result.data.content.fields);
        }
      }
    }

    // 等待所有异步任务完成后再输出 formList
    console.log('test', res, formList);
    return formList; 
  };

  const { data: formList, isLoading, isError } = useQuery({
    queryKey: ['formList', wallet?.account?.address],
    queryFn: getFormList,
    enabled: !!wallet?.account?.address,
  });

  const createSurvey = () => {
    router.push('/createSurvey');
  }

  return (
    <>
    {/* {contextHolder} */}
  <main>
    <div className="z-0" 
      style={{backgroundImage: 'url(/form_bg.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
    >
      {isLoading && <Spin spinning={isLoading} fullscreen />}
      <div className="min-h-screen">
        <div className="absolute left-8">
          <img src="/logo2.png" className="h-32 mt-4 ml-8" alt="logo" />
        </div>
        <div className="absolute right-8 mt-8 z-10">
          <Navbar />
        </div>
        {!isLoading && <>
        <div className='absolute right-16 mt-28 z-0'>
          <button
            onClick={createSurvey}
            className="text-base px-16 py-2 bg-[#5b91a5] text-white rounded-full transition duration-200"
          >
            Create survey
          </button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-between w-full p-40'>
          {formList?.map((i, index) => (
            <Card 
              key={index} 
              title={i.name} 
              bordered={false} 
              style={{
                maxWidth: '24rem',
                minWidth: '6rem',
                margin: '1rem',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease', 
                boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
              }}
            >
              {i?.participants.length} responses
            </Card>
          ))}
        </div>
        </>
        }
      </div>
    </div>
  </main>
  </>
  )
}

export default Dashboard