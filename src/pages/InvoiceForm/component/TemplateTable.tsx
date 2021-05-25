import { Button, Table } from 'antd';
import { useModel } from 'umi';
import TemplateFormModal from './TemplateFormModal';
export default () => {
  const { formTemplates, setFormTemplates } = useModel('formTemplates');
  type RecordType = {
    key: number;
    name: string;
  };
  const dataSource = Object.keys(formTemplates).map((s: string, i: number) => ({
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
        <TemplateFormModal initialValues={formTemplates[record.name]} edit={true} />
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};
