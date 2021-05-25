import { PageContainer, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Select, Button, message, Col, Row, Typography, Table, Space, Divider } from 'antd';
import { useModel } from 'umi';
import { useRef, useState } from 'react';
import React from 'react';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

import { PlusOutlined } from '@ant-design/icons';
import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import InvoiceForm from './InvoiceForm';
import RentInfoFormSection from './component/RentSection';
import Title from 'antd/lib/skeleton/Title';
import CompanyFormSection from './component/CompanySection';
import InvoiceInfoFormSection from './component/InvoiceSection';
import ParticularsFormSection from './component/ParticularsSection';
import SupplyInfoFormSection from './component/SupplySection';
import type { FormInstance } from 'antd';
import { InvoiceFormContext } from './component/context/InvoiceFormContext';
import TemplateTable from './component/TemplateTable';
import TemplateFormModal from './component/TemplateFormModal';

export default () => {
  return (
    <PageHeaderWrapper title="Form Settings">
      <Row>
        <Col span={24}>
          <Card title="Add Billing to Templates">
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
