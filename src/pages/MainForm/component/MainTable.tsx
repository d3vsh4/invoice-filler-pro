import { Button, Table } from 'antd';
import { useModel } from 'umi';
import PreviewSlipModal from './PreviewSlipModal';
export default () => {
    const { formInvoices } = useModel('formInvoices');
    type RecordType = {
        key: number;
        name: string;
    };
    const dataSource = Object.keys(formInvoices).map((s: string, i: number) => ({
        key: i,
        name: s,
    }));

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
                <PreviewSlipModal data={formInvoices[record.name]} />
            ),
        },
    ];

    return <Table dataSource={dataSource} columns={columns} />;
};
