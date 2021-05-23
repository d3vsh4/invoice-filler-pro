import React from 'react';
import { Col, Divider, Row, Space } from 'antd';
import { ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { useState, useContext } from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { ProCreateInvoiceContext } from '../context/ProCreateInvoiceContext';

const RentInfoFormSection: React.FC<DataProps> = ({ data }) => {
  const { formRef } = useContext(ProCreateInvoiceContext);
  const helper = {
    rentType: formRef?.getFieldValue('rent_type'),
    taxAmount: Math.round((formRef?.getFieldValue('taxable_amount') * 18) / 100),
    taxableAmount: formRef?.getFieldValue('taxable_amount'),
  };
  const setTaxableAmountField = () => {
    if (helper.rentType != 'fixed') {
      const taxable_amount = Math.round(
        formRef?.getFieldValue('area') * formRef?.getFieldValue('per_rate'),
      );
      formRef?.setFieldsValue({
        taxable_amount: taxable_amount,
      });
    }
  };
  const isSameState = data?.bf_state === data?.bt_state;
  return (
    <Row justify="space-between">
      <ProFormSelect
        rules={[{ required: true }]}
        options={[
          {
            value: 'variable',
            label: 'By Area',
          },
          {
            value: 'fixed',
            label: 'Fixed',
          },
        ]}
        placeholder="please select rent type"
        name="rent_type"
        label="Rent Type"
        fieldProps={{
          onChange: (v) => {
            v == 'fixed'
              ? formRef?.setFieldsValue({ taxable_amount: 0 })
              : formRef?.setFieldsValue({ taxable_amount: 0, area: 0, per_rate: 0 });
          },
        }}
      />
      <Col span={1} />
      <ProFormDigit
        rules={[{ required: true }]}
        label="Area Sq. Ft."
        name="area"
        placeholder="enter total area"
        disabled={helper.rentType == 'fixed' ? true : false}
        fieldProps={{
          onChange: setTaxableAmountField,
        }}
      />
      <Col span={1} />
      <ProFormDigit
        rules={[{ required: true }]}
        label="Rate/Unit"
        name="per_rate"
        placeholder="enter per unit price"
        disabled={helper.rentType == 'fixed' ? true : false}
        fieldProps={{
          step: '0.001',
          formatter: (value) => `₹ ${value}`,
          onChange: setTaxableAmountField,
          parser: (value) => value!.replace('₹ ', ''),
        }}
      />
      <Col span={1} />
      <ProFormDigit
        rules={[{ required: true }]}
        label="Taxable Amount :"
        name="taxable_amount"
        placeholder="taxable amount"
        readonly={helper.rentType == 'variable' ? true : false}
        fieldProps={{
          formatter: (value) => `₹ `,
          parser: (value) => value!.replace('₹ ', ''),
        }}
        help={
          <div
            style={{
              textAlign: 'left',
              display: 'flex',
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              flexDirection: 'column',
            }}
          >
            {!isSameState ? (
              <div>
                IGST @ 18%: <span style={{ color: 'red' }}>{`+ ₹ ${helper.taxAmount}`}</span>
              </div>
            ) : (
              <div>
                CGST @ 9%: <span style={{ color: 'red' }}>{`+ ₹ ${helper.taxAmount / 2}`}</span>
                <br />
                SGST @ 9%: <span style={{ color: 'red' }}>{`+ ₹ ${helper.taxAmount / 2}`}</span>
              </div>
            )}
            <Divider style={{ margin: '6px' }} />
            <div>
              Total tax: <span style={{ color: 'red' }}>{`₹ ${helper.taxAmount}`}</span>
            </div>
            <div>
              Total taxable amount:{' '}
              <span style={{ color: 'red' }}>{`+ ₹ ${helper.taxableAmount}`}</span>
            </div>
            <Divider style={{ margin: '6px' }} />
            <div>
              Payabal amount:{' '}
              <span style={{ color: 'green' }}>{`₹ ${
                helper.taxAmount + helper.taxableAmount
              }`}</span>
            </div>
          </div>
        }
      />
      <Col span={1} />

      {/* <ProDescriptions
        size={'small'}
        title="Tax Information"
        column={1}
        labelStyle={{ backgroundColor: 'white' }}
        contentStyle={{ color: 'red', fontWeight: 'bold' }}
      >
        <ProDescriptions.Item label="Taxable amount">{`₹ ${helper.taxableAmount}`}</ProDescriptions.Item>
        {isSameState ? (
          <ProDescriptions.Item label="IGST @ 18%">{`₹ ${helper.taxAmount}`}</ProDescriptions.Item>
        ) : (
          <>
            <ProDescriptions.Item label="CGST @ 9%">{`₹ ${
              helper.taxAmount / 2
            }`}</ProDescriptions.Item>
            <ProDescriptions.Item label="SGST @ 9%">{`₹ ${
              helper.taxAmount / 2
            }`}</ProDescriptions.Item>
          </>
        )}
        <ProDescriptions.Item label="Total tax">{`₹ ${helper.taxAmount}`}</ProDescriptions.Item>
        <ProDescriptions.Item label="Payabal amount" contentStyle={{ color: 'green' }}>{`₹ ${
          helper.taxAmount + helper.taxableAmount
        }`}</ProDescriptions.Item>
      </ProDescriptions>
     */}
    </Row>
  );
};
export default RentInfoFormSection;
