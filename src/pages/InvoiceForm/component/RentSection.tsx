import React from 'react';
import { Col, Divider, Row, Space } from 'antd';
import { ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { useState, useContext, useMemo } from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import { InvoiceFormContext } from './context/InvoiceFormContext';
import { useModel } from 'umi';
import { MyFormData } from '@/models/types';

const RentInfoFormSection: React.FC = () => {
  const { formRef } = useContext(InvoiceFormContext);
  const { formState, setFormState }: MyFormData = useModel('form');
  const helper = {
    rentType: formRef?.getFieldValue('rent_type'),
    taxAmount: Math.round((formRef?.getFieldValue('taxable_amount') * 18) / 100),
    taxableAmount: Math.round(formRef?.getFieldValue('taxable_amount')),
    isSameState: formRef?.getFieldValue('bf_state') == formRef?.getFieldValue('bt_state'),
  };
  const setTaxableAmountField = () => {
    if (helper.rentType != 'fixed') {
      const taxable_amount =
        formRef?.getFieldValue('area') *
        (Math.round((formRef?.getFieldValue('per_rate') + Number.EPSILON) * 1000) / 1000);
      formRef?.setFieldsValue({
        taxable_amount: taxable_amount,
      });
      // setFormState((prevState) => ({
      //   ...prevState,
      //   taxable_amount,
      // }));
    }
  };
  const HelpComp = () => (
    <table style={{ textAlign: 'right' }}>
      <tbody>
        <tr>
          <td>Total taxable amount: </td>
          <td style={{ color: 'red' }}>
            {`+ ₹ ${helper.taxableAmount.toFixed(2)}`.replace(
              /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
              ',',
            )}
          </td>
        </tr>
        <>
          {!helper.isSameState ? (
            <tr>
              <td>IGST @ 18%: </td>
              <td style={{ color: 'red' }}>
                {`₹ ${helper.taxAmount.toFixed(2)}`.replace(
                  /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                  ',',
                )}
              </td>
            </tr>
          ) : (
            <>
              <tr>
                <td> CGST @ 9%: </td>
                <td style={{ color: 'red' }}>
                  {`₹ ${(helper.taxAmount / 2).toFixed(2)}`.replace(
                    /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                    ',',
                  )}
                </td>
              </tr>
              <tr>
                <td> SGST @ 9%: </td>
                <td style={{ color: 'red' }}>
                  {`+ ₹ ${(helper.taxAmount / 2).toFixed(2)}`.replace(
                    /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                    ',',
                  )}
                </td>
              </tr>
            </>
          )}
        </>
        <tr>
          <td>Total tax: </td>
          <td style={{ color: 'red' }}>
            {`+ ₹ ${helper.taxAmount.toFixed(2)}`.replace(
              /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
              ',',
            )}
          </td>
        </tr>
        <tr>
          <td>
            <Divider style={{ margin: '6px' }} />
          </td>
          <td>
            <Divider style={{ margin: '6px' }} />
          </td>
        </tr>
        <tr>
          <td>Payabal amount: </td>
          <td style={{ color: 'green' }}>
            {` ₹ ${(helper.taxAmount + helper.taxableAmount).toFixed(2)}`.replace(
              /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
              ',',
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
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
        allowClear={false}
        fieldProps={{
          onChange: (v) => formRef?.setFieldsValue({ taxable_amount: 0, area: 0, per_rate: 0 }),
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
          parser: (value) => value!.replace(/\₹\s?|(,*)/g, ''),
          onChange: setTaxableAmountField,
        }}
      />
      <Col span={1} />
      <ProFormDigit
        rules={[{ required: true }]}
        label="Taxable Amount :"
        name="taxable_amount"
        placeholder="taxable amount"
        fieldProps={{
          readOnly: helper.rentType == 'variable' ? true : false,
          step: '0.01',
          formatter: (value) => `₹ ${value}`,
          parser: (value) => value!.replace(/\₹\s?|(,*)/g, ''),
        }}
        help={<HelpComp />}
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
