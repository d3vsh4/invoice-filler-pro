import { Button, Table, Typography } from 'antd';
import PreviewSlipModal from './PreviewSlipModal';
import { useEffect, useState } from 'react';
import { showInvoices } from '@/models/mainDB'

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
        render: (text: string, record: RecordType) => <Typography.Text>{record.data.invoice_date}</Typography.Text>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: string, record: RecordType) => (
            <PreviewSlipModal data={record.data} />
        ),
    },
];


export default (props: { dataSource: RecordType[] }) => {

    return <Table rowKey="uid" dataSource={props.dataSource} columns={columns} />;
};
