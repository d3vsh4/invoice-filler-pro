import { Card, Col, message, Row, Typography, Button, Input } from 'antd';
import ProForm from '@ant-design/pro-form';
import { useModel } from 'umi';
import MainTable from './component/MainTable';
import React, { useEffect, useState } from 'react';
import MainFormModal from './component/MainFormModal';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { showInvoices } from '@/services/db-services/mainDB';
const { Search } = Input;

type RecordType = {
  key: string;
  name: string;
  data: FormStateTypes;
};


export default () => {
  const demo = useModel('demo');
  const [mainVisible, setMainVisible] = useState(false);
  const [dataSource, setData] = useState<RecordType[]>([])
  const [tableData, setTableData] = useState<RecordType[]>([])
  const { } = useModel('counter'); //used to rerender this component evenunused
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
