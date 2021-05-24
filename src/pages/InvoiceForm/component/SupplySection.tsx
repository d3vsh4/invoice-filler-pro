import React from 'react';
import { Col, Row } from 'antd';
import { ProFormRadio } from '@ant-design/pro-form';
import { useContext } from 'react';
import { InvoiceFormContext } from './context/InvoiceFormContext';
import AdressFormSection from './AddressSection';

const SupplyInfoFormSection: React.FC<DataProps> = () => {
  const { formRef } = useContext(InvoiceFormContext);

  const setSupplyAdress = (prefix: string) => {
    try {
      formRef?.setFieldsValue({
        s_street: formRef?.getFieldValue(prefix + '_street'),
        s_city: formRef?.getFieldValue(prefix + '_city'),
        s_state: formRef?.getFieldValue(prefix + '_state'),
        s_zip: formRef?.getFieldValue(prefix + '_zip'),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <ProFormRadio.Group
        name="s_addr_choice"
        label="Same Address as:"
        options={[
          {
            label: 'Bill from',
            value: 'bf',
          },
          {
            label: 'Bill to',
            value: 'bt',
          },
        ]}
        fieldProps={{ onChange: (e) => setSupplyAdress(e.target.value) }}
      />
      <Col span={3}></Col>
      <Col span={12}>
        <AdressFormSection prefix="s" />
      </Col>
    </Row>
  );
};

export default SupplyInfoFormSection;
