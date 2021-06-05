import React from 'react';
import { Col, Row } from 'antd';
import { ProFormSelect, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { useContext } from 'react';
import { stateData } from './state-city';
import { MainFormContext } from './context/MainFormContext';
import { useModel } from 'umi';
import type { MyFormData } from '@/models/types';
// import { useModel } from 'umi';
const cityData = stateData;
const states = Object.keys(cityData);

const AdressFormSection: React.FC<DataProps> = ({ prefix, readonly = false }) => {
  const [cities, setCities] = React.useState(cityData[states[3]]);
  const { formRef } = useContext(MainFormContext);
  const { formState, setFormState }: MyFormData = useModel('form');

  // const { increment } = useModel('counter');
  const handleStateChange = (value: string) => {
    // increment();
    setFormState((prevData) => ({
      ...prevData,
      bt_state: value
    }));
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
        // fieldProps={{ readOnly: readonly }}
        disabled={readonly}
      />
      <Row>
        <ProFormSelect
          rules={[{ required: true }]}
          label="State"
          name={prefix + '_state'}
          showSearch
          disabled={readonly}
          // readonly={readonly}
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
          disabled={readonly}
        // readonly={readonly}
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
          disabled={readonly}
        // fieldProps={{ readOnly: readonly }}
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
            // readonly
            disabled
          />
        ) : null}
      </Row>
    </>
  );
};
export default AdressFormSection;
