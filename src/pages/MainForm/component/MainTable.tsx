import { MyFormDBData } from '@/models/formInvoices';
import { Button, Table } from 'antd';
import { useModel } from 'umi';
import PreviewSlipModal from './PreviewSlipModal';
export default () => {
    const { getInvoiceFormData } = useModel('formInvoices');
    type RecordType = {
        key: string;
        name: string;
        data: FormStateTypes;
    };
    const dataSource = getInvoiceFormData().map((obj: MyFormDBData, i: number) => ({
        key: obj.key,
        name: obj.id,
        data: obj.doc
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
                <PreviewSlipModal data={record.data} />
            ),
        },
    ];

    return <Table dataSource={dataSource} columns={columns} />;
};
