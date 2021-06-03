
import { ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import TemplateSelector from './TemplateSelector';
import { getFiscalYear } from '@/utils/utils';
import { useModel } from 'umi';
import { useContext } from 'react';
import { MainFormContext } from './common/context/MainFormContext';
import { getLastId } from '@/services/db-services/mainDB';

const InvoiceInfoFormSection: React.FC = () => {
  const dateFormat = 'DD/MM/YYYY';
  const { formRef } = useContext(MainFormContext);
  // TODO: setting invoice number
  useEffect(() => {
    const doSetInv = async () => {
      var lastID = await getLastId();
      lastID = lastID ? lastID : "00-00/0000";
      const newID = getFiscalYear() + '/' + (Number(lastID.slice(6, 10)) + 1).toString().padStart(4, '0');
      // setIvn(newID);
      formRef?.setFieldsValue({ "invoice_no": newID })
      // const info = await showInvoices();
      // console.log(newID, lastID, info);
    }
    doSetInv();
  });
  return (
    <>
      <Row justify="space-between">
        <ProFormText
          rules={[{ required: true }]}
          name="invoice_no"
          label="Invoice Number"
          initialValue={"00-00/0000"}
          style={{ textAlign: "start" }}
          placeholder="enter invoice number here"
          readonly
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
