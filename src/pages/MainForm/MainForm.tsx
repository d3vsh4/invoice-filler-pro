import { Card, Col, message, Row, Typography, Button } from 'antd';
import ProForm from '@ant-design/pro-form';
import { useModel } from 'umi';
import MainTable from './component/MainTable';
import React, { useState } from 'react';
import MainFormModal from './component/MainFormModal';

export default () => {
  const demo = useModel('demo');
  const [mainVisible, setMainVisible] = useState(false);

  const { } = useModel('counter'); //used to rerender this component evenunused

  return (
    <Row justify="center">
      <Col span={24}>
        <Card>
          <MainFormModal mainVisibility={{ mainVisible: mainVisible, setMainVisible: setMainVisible }} />
        </Card>
      </Col>
      <Col span={24}>

        <Card>
          <MainTable />
        </Card>
      </Col>
    </Row>
  );
};
