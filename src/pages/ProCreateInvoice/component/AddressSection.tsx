import React from 'react';
import { Col, Row } from 'antd';
import { ProFormSelect, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { useContext } from 'react';
import { stateData } from '../data/state-city';
import { CreateFormContext } from '../context/CreateFormContext';
const cityData = stateData;
const states = Object.keys(cityData);

const AdressFormSection: React.FC<DataProps> = ({ prefix }) => {
  const [cities, setCities] = React.useState(cityData[states[3]]);
  const { formRef } = useContext(CreateFormContext);

  const handleStateChange = (value: string) => {
    setCities(cityData[value]);
    formRef?.setFieldsValue({ [prefix + '_city']: cityData[value][0] });
  };

  return (
    <>
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_street'}
        label="Street Address"
        placeholder="Please enter the Street address"
      />
      <Row>
        <ProFormSelect
          rules={[{ required: true }]}
          label="State"
          name={prefix + '_state'}
          showSearch
          fieldProps={{ onChange: handleStateChange }}
          options={states.map((s: string) => ({ value: s, label: s }))}
          allowClear={false}
        />
        <Col span={1}></Col>

        <ProFormSelect
          rules={[{ required: true }]}
          showSearch
          label="City"
          name={prefix + '_city'}
          options={cities.map((city: string) => ({ value: city, label: city }))}
          allowClear={false}
        />
        <Col span={1}></Col>
        <ProFormDigit
          rules={[
            {
              required: true,
              pattern: new RegExp('^[1-9]{1}[0-9]{2}[0-9]{3}$'),
              message: 'Valid PIN is required',
            },
          ]}
          name={prefix + '_zip'}
          label="Postal/Zip Code"
          placeholder="enter postal/zip"
        />
        <Col span={1}></Col>

        {prefix == 'bf' ? (
          <ProFormText
            rules={[
              {
                required: true,
                pattern: new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
                message: 'Not a valid PAN',
              },
            ]}
            name="pan"
            label="PAN"
            placeholder="enter PAN here"
            normalize={(value) => (value || '').toUpperCase()}
            readonly
          />
        ) : null}
      </Row>
    </>
  );
};
export default AdressFormSection;
