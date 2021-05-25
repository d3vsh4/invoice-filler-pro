import { ProFormSelect } from '@ant-design/pro-form';
import React, { useContext } from 'react';
import { useModel } from 'umi';
import { InvoiceFormContext } from './context/InvoiceFormContext';

const TemplateSelector: React.FC = () => {
  const { formTemplates } = useModel('formTemplates');
  const { formRef } = useContext(InvoiceFormContext);
  const handleTemplateChange = (name: string) => {
    formRef?.setFieldsValue(formTemplates[name]);
  };
  return (
    <ProFormSelect
      //   fieldProps={{ labelInValue: true }}
      //   rules={[{ required: true }]}
      label="Form Template"
      placeholder="Select form template"
      //   name=""
      initialValue={'initial'}
      fieldProps={{ defaultValue: 'initial', onChange: handleTemplateChange }}
      options={Object.keys(formTemplates).map((s: string) => ({ value: s, label: s }))}
      allowClear={false}
    />
  );
};
export default TemplateSelector;
