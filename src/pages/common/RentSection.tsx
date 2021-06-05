import React from 'react';
import { Col, Divider, Row, Space } from 'antd';
import { ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import { useState, useContext, useMemo } from 'react';
import { MainFormContext } from './context/MainFormContext';
import { useModel } from 'umi';
import { gst18, toFixDec } from '@/utils/utils';
import { useEffect } from 'react';

const RentInfoFormSection: React.FC = () => {
  const { formRef } = useContext(MainFormContext);
  const [rentType, setRentType] = useState('variable');
  const [counter, setCounter] = useState(-50);

  const helper = {
    perRate: toFixDec(formRef?.getFieldValue('per_rate'), 3), //3 dec
    area: toFixDec(formRef?.getFieldValue('area'), 2), // 2 dec
    taxAmount: gst18(formRef?.getFieldValue('taxable_amount')), //rounded off
    taxableAmount: Math.round(formRef?.getFieldValue('taxable_amount')),
    isSameState: formRef?.getFieldValue('bf_state') == formRef?.getFieldValue('bt_state'),
  };
  const handleAreaChange = (v: number | string) => {
    v = parseFloat(`${v}`);
    const taxable_amount = toFixDec(v, 2) * helper.perRate;
    formRef?.setFieldsValue({
      taxable_amount: taxable_amount,
    });
    setCounter(counter + 1);
  };
  const handleRateChange = (v: number | string) => {
    console.log('changed');

    v = parseFloat(`${v}`);
    const taxable_amount = helper.area * toFixDec(v, 3);
    formRef?.setFieldsValue({
      taxable_amount: taxable_amount,
    });
    setCounter(counter + 1);
  };
  const handleTaxableAmountChange = (v: number | string) => {
    v = parseFloat(`${v}`);
    setCounter(counter + 1);
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
          onChange: (v) => {
            formRef?.setFieldsValue({ area: 0, per_rate: 0, taxable_amount: 0 });
            setRentType(v);
          },
        }}
      />
      <Col span={1} />
      <ProFormDigit
        rules={[{ required: true }]}
        max={999999999999}
        label="Area Sq. Ft."
        name="area"
        placeholder="enter total area"
        disabled={rentType == 'fixed' ? true : false}
        fieldProps={{
          onChange: handleAreaChange,
        }}
      />
      <Col span={1} />
      <ProFormDigit
        rules={[{ required: true }]}
        max={999999999999}
        label="Rate/Unit"
        name="per_rate"
        placeholder="enter per unit price"
        disabled={rentType == 'fixed' ? true : false}
        fieldProps={{
          step: '0.001',
          formatter: (value) => `₹ ${value}`,
          parser: (value) => value!.replace(/\₹\s?|(,*)/g, ''),
          onChange: handleRateChange,
        }}
      />
      <Col span={1} />
      <ProFormDigit
        rules={[{ required: true }]}
        label="Taxable Amount :"
        name="taxable_amount"
        placeholder="taxable amount"
        fieldProps={{
          readOnly: rentType == 'variable' ? true : false,
          step: '0.01',
          formatter: (value) => `₹ ${value}`,
          parser: (value) => value!.replace(/\₹\s?|(,*)/g, ''),
          onChange: handleTaxableAmountChange,
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
