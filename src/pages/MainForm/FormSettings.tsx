import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Row, Divider } from 'antd';

import { INITIAL_FORM_VALUES } from '@/models/InitialValues';
import TemplateTable from './component/TemplateTable';
import TemplateFormModal from './component/TemplateFormModal';

export default () => {
  return (
    <PageHeaderWrapper title="Form Settings">
      <Row>
        <Col span={24}>
          <Card title="Add Billing Options">
            <TemplateFormModal initialValues={INITIAL_FORM_VALUES} />
          </Card>
        </Col>
        <Divider style={{ border: '0px' }} />
        <Col span={24}>
          <TemplateTable />
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};
