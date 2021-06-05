import { Card, Col, Row, Input } from 'antd';
import MainTable from './components/MainTable';
import { useEffect, useState } from 'react';
import MainFormModal from './components/MainFormModal';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { showInvoices } from '@/services/db-services/mainDB';
const { Search } = Input;

type RecordType = {
  key: string;
  name: string;
  data: FormStateTypes;
};

export default () => {
  const [mainVisible, setMainVisible] = useState(false);
  const [dataSource, setData] = useState<RecordType[]>([])
  const [tableData, setTableData] = useState<RecordType[]>([])
  // const { } = useModel('counter'); //used to rerender this component evenunused
  const onSearch = (value: string) => {
    const filteredEvents = dataSource.filter(({ key }) => {
      // key = key.toLowerCase();
      return key.includes(value);
    });
    setTableData(filteredEvents);
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
            <MainFormModal mainVisibility={{ mainVisible: mainVisible, setMainVisible: setMainVisible }} />
            <Search placeholder="Enter Invoice Number" onSearch={onSearch} style={{ width: 200 }} />
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <MainTable dataSource={tableData} />
      </Col>
    </PageHeaderWrapper>
  );
};
