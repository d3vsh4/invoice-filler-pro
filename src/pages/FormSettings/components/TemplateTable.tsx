import { deleteTemplate } from '@/services/db-services/templateDB';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Table, Typography } from 'antd';
import TemplateFormModal from './TemplateFormModal';

type RecordType = {
  key: string;
  name: string;
  data: FormStateTypes;
};

export default (props: { dataSource: RecordType[]; loading: boolean; handleDelete: (data: FormStateTypes) => {} }) => {
  // const { formTemplates, setFormTemplates } = useModel('formTemplates');
  const { dataSource, loading, handleDelete } = props;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: RecordType) => (
        <Typography.Text strong>{record.name}</Typography.Text>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: RecordType) => (
        <Space>
          <TemplateFormModal initialValues={record.data} edit={true} />
          <Button
            onClick={(e)=> handleDelete(record.data)}
            type="default"
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return <Table dataSource={dataSource} columns={columns} loading={loading} />;
};
