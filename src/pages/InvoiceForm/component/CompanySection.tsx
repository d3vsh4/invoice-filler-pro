import React from 'react';
import { Col, Row } from 'antd';
import { ProFormText } from '@ant-design/pro-form';
import AdressFormSection from './AddressSection';

const CompanyFormSection: React.FC<DataProps> = ({ prefix, readonly }) => {
  return (
    <Col>
      <Row>
        <Col>
          <ProFormText
            rules={[{ required: true }]}
            name={prefix + '_name'}
            // width="md"
            label="Company Name"
            placeholder="Please enter the name"
            normalize={(value) => (value || '').toUpperCase()}
            fieldProps={{ readOnly: readonly }}
          />
        </Col>
        <Col span={1}></Col>
        <Col>
          <ProFormText
            rules={[
              {
                required: true,
                len: 15,
                pattern: new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'),
                message: 'Not a valid GST',
              },
            ]}
            normalize={(value) => (value || '').toUpperCase()}
            // width="md"
            name={prefix + '_gstin'}
            label="GSTIN"
            placeholder="Please enter the GSTIN no."
            fieldProps={{ readOnly: readonly }}
          />
        </Col>
      </Row>
      <AdressFormSection prefix={prefix} readonly={readonly} />
    </Col>
  );
};

export default CompanyFormSection;
