"use client";
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import Navbar from "../../../components/Navbar";
import {useWallet} from '@suiet/wallet-kit';
import { Table, Spin, Modal, message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Transaction as TX } from "@mysten/sui/transactions";

const Dashboard = () => {
 
  const client = new SuiClient({ url: getFullnodeUrl('testnet') });
  const wallet = useWallet();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const getFormList = async () => {
    let formList:any = [];
    
    const res: any = await client.getObject({
      id: `${process.env.NEXT_PUBLIC_CONTRACT_STATE}`,
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

    console.log('test', res, formList);
    return formList; 
  };

  const { data: allFormList, isLoading, isError } = useQuery({
    queryKey: ['formList', wallet?.account?.address],
    queryFn: getFormList,
    enabled: !!wallet?.account?.address,
  });

  const paginatedFormList = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allFormList?.slice(startIndex, endIndex) || [];
  }, [allFormList, currentPage, pageSize]);

  const createSurvey = () => {
    router.push('/createSurvey');
  }

  const viewSurveyDetails = (record: any) => {
    if (record.participants.length === 0) {
      messageApi.info('No responses for this survey yet.');
    } else {
      setSelectedSurvey(record);
      setIsModalVisible(true);
    }
  }

  const columns = [
    {
      title: 'Survey Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Responses',
      dataIndex: 'participants',
      key: 'participants',
      render: (participants: any[]) => participants.length,
    },
  ];

  return (
    <>
    {contextHolder}
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
          <div className='px-20 pt-48'>
            <Table 
              dataSource={paginatedFormList} 
              columns={columns}
              rowKey={(record) => record.id}
              onRow={(record) => ({
                onClick: () => viewSurveyDetails(record),
              })}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                },
                total: allFormList?.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} items`,
              }}
            />
          </div>
          </>
          }
        </div>
      </div>
    </main>
    <Modal
      title="Survey Responses"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      {selectedSurvey && (
        <div>
          <h2>{selectedSurvey.name}</h2>
          <p>Total Responses: {selectedSurvey.participants.length}</p>
          {/* 这里可以添加更多的响应数据展示 */}
        </div>
      )}
    </Modal>
    </>
  )
}

export default Dashboard