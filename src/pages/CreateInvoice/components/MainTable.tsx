import { Button, Table, Typography, Space } from 'antd';
import PreviewSlipModal from './PreviewSlipModal';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

type RecordType = {
  key: string;
  name: string;
  data: FormStateTypes;
};

// let dataSource: {
//     key: string,
//     name: string,
//     data: any
// }[] = [{
//     key: "00-00/0000",
//     name: "00-00/0000",
//     data: INITIAL_FORM_VALUES
// }]


export default (props: { dataSource: RecordType[], handleDelete: (data:FormStateTypes)=>{} }) => {
    const columns = [
        {
          title: 'Invoice No.',
          dataIndex: 'name',
          key: 'name',
          render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          render: (text: string, record: RecordType) => (
            <Typography.Text>{record.data.invoice_date}</Typography.Text>
          ),
        },
        {
          title: 'Party Name',
          dataIndex: 'party',
          key: 'party',
          render: (text: string, record: RecordType) => (
            <Typography.Text>{record.data.bt_name}</Typography.Text>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text: string, record: RecordType) => (
            <Space>
              <PreviewSlipModal data={record.data} />
              <Button
                onClick={(e)=>props.handleDelete(record.data)}
                type="default"
                danger
                icon={<DeleteOutlined />}
              ></Button>
            </Space>
          ),
        },
      ];
  return <Table rowKey="uid" dataSource={props.dataSource} columns={columns} />;
};
