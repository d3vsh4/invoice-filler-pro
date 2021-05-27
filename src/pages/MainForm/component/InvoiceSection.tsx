import { useModel } from '@/.umi/plugin-model/useModel';
import { ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import React from 'react';
import TemplateSelector from './TemplateSelector';

const InvoiceInfoFormSection: React.FC = () => {
  const dateFormat = 'DD/MM/YYYY';

  return (
    <>
      <Row justify="space-between">
        <ProFormText
          rules={[{ required: true }]}
          name="invoice_no"
          label="Invoice Number"
          initialValue={"1"}
          placeholder="enter invoice number here"
        />
        <Col span={1}></Col>
        <ProFormDatePicker
          rules={[{ required: true }]}
          name="invoice_date"
          label="Date"
          fieldProps={{ format: dateFormat }}
        />
        <Col span={1}></Col>
        <TemplateSelector />
      </Row>
    </>
  );
};
export default InvoiceInfoFormSection;
