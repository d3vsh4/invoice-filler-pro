import React from 'react';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';

const ParticularsFormSection: React.FC = () => {
  return (
    <>
      <ProFormText
        rules={[{ required: true }]}
        name="p_head"
        label="Heading"
        // width="xl"
        placeholder="enter heading"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        name="p_content"
        label="Narration"
        // width="xl"
        placeholder="write content here"
      />
      <ProFormTextArea
        name="p_note"
        label="Note"
        // width="xl"
        placeholder="write note here"
      />
    </>
  );
};

export default ParticularsFormSection;
