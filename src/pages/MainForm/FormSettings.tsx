import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Row, Divider } from 'antd';

import { INITIAL_FORM_VALUES } from '@/models/InitialValues';
import TemplateTable from './component/TemplateTable';
import TemplateFormModal from './component/TemplateFormModal';
import { useEffect, useState } from 'react';
import { showTemplates } from '@/services/db-services/templateDB';


type RecordType = {
  key: string;
  name: string;
  data: FormStateTypes;
};

export default () => {
  const [dataSource, setData] = useState<RecordType[]>([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("in use effects");

    (async function doInitials() {
      let templates = (await showTemplates()).rows;
      console.log(templates);
      let data = templates.map((obj: any) => ({
        key: obj.key,
        name: obj.id,
        data: obj.doc
      }));
      if (dataSource.length != data.length) {
        setData(data);
        // setTableData(data);
      }
    })()

  });
  return (
    <PageHeaderWrapper title="Form Settings">
      <Row>
        <Col span={24}>
          <Card title="Add Billing Options">
            <TemplateFormModal initialValues={INITIAL_FORM_VALUES} setLoading={setLoading} />
          </Card>
        </Col>
        <Divider style={{ border: '0px' }} />
        <Col span={24}>
          <TemplateTable dataSource={dataSource} loading={loading} />
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};
