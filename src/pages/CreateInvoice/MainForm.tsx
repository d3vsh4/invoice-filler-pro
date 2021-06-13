import { Card, Col, Row, Input } from 'antd';
import MainTable from './components/MainTable';
import { useEffect, useState } from 'react';
import MainFormModal from './components/MainFormModal';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { deleteInvoice, showInvoices } from '@/services/db-services/mainDB';
const { Search } = Input;

type RecordType = {
  key: string;
  name: string;
  data: FormStateTypes;
};

export default () => {
  const [mainVisible, setMainVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setData] = useState<RecordType[]>([])
  const [tableData, setTableData] = useState<RecordType[]>([])
  // const { } = useModel('counter'); //used to rerender this component evenunused
  const onSearch = (value: string) => {
    const filteredEvents = dataSource.filter(({ key }) => {
      return key.includes(value);
    });
    setTableData(filteredEvents);
  };
  const onPartySearch = (value: string) => {
    const filteredEvents = dataSource.filter(({ data }) => {
      const d = data.bt_name.toLowerCase();
      return d.includes(value) || data.bt_name.includes(value);
    });
    setTableData(filteredEvents);
  };
  const onDelete = async (data: FormStateTypes) => {
    setLoading(true);
    await deleteInvoice(data);
    setLoading(false);
  };
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
      if (dataSource.length != data.length) {
        setData(data);
        setTableData(data);
      }
    })()

  });

  return (
    <PageHeaderWrapper>
      <Col span={24}>
        <Card>
          <Row justify="space-between">
            <MainFormModal
              mainVisibility={{ mainVisible: mainVisible, setMainVisible: setMainVisible }}
            />
            <Search
              placeholder="Enter Party Name"
              onSearch={onPartySearch}
              style={{ width: 200 }}
            />
            <Search placeholder="Enter Invoice Number" onSearch={onSearch} style={{ width: 200 }} />
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <MainTable dataSource={tableData} handleDelete={onDelete}  />
      </Col>
    </PageHeaderWrapper>
  );
};
