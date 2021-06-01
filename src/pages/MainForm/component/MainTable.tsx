import type { MyFormDBData } from '@/models/formInvoices';
import { Button, Table } from 'antd';
import { useModel } from 'umi';
import PreviewSlipModal from './PreviewSlipModal';
import { INITIAL_FORM_VALUES } from '../../../models/InitialValues';
import { useEffect, useState } from 'react';
import { showInvoices } from '@/models/db'
console.log("testing renderer");

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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <Button>{text}</Button>,
    },
    {
        title: 'Action',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: RecordType) => (
            <PreviewSlipModal data={record.data} />
        ),
    },
];


export default () => {
    const [dataSource, setData] = useState<{
        key: string,
        name: string,
        data: any
    }[]>([])
    useEffect(() => {
        console.log("in use effects");

        (async function doInitials() {
            let invoices = (await showInvoices()).rows;
            console.log(invoices);
            let data = invoices.map((obj: any, i: number) => ({
                key: obj.key,
                name: obj.id,
                data: obj.doc
            }));
            if (dataSource.length != data.length)
                setData(data)
        })()
    });



    return <Table rowKey="uid" dataSource={dataSource} columns={columns} />;
};
