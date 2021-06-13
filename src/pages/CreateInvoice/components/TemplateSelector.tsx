import { showTemplates, tempDB } from '@/services/db-services/templateDB';
import { ProFormSelect } from '@ant-design/pro-form';
import React, { useContext, useState, useEffect } from 'react';
import { useModel } from 'umi';
import { MainFormContext } from '@/pages/common/context/MainFormContext';

const TemplateSelector: React.FC = () => {
  // const { formTemplates } = useModel('formTemplates');
  const { formRef } = useContext(MainFormContext);
  const { setFormState } = useModel('form');
  const [options, setOptions] = useState<{ value: string; lable: string; }[]>([]);
  const handleTemplateChange = async (name: string) => {
    const templates = (await tempDB.get(name));
    formRef?.setFieldsValue(templates);
    setFormState((ps) => ({
      ...ps,
      ...templates,
    }));
  };
  useEffect(() => {
    (async function doInitialize() {
      const templates = (await showTemplates()).rows;
      const op = templates.map((t) => ({ value: t.id, lable: t.id }));
      if (op.length != options.length) {
        setOptions(op);
      }
    })()
  })
  return (
    <ProFormSelect
      label="Party Template"
      placeholder="Select party template"
      fieldProps={{ onChange: handleTemplateChange }}
      options={options}
      allowClear={false}
    />
  );
};
export default TemplateSelector;
