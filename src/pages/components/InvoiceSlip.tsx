import { Col, Descriptions, Divider, Row, Space, Typography } from 'antd';
import React from 'react';
const { Text, Title } = Typography;
type InvoiceSlipInputType = {
  data: FormStateTypes;
};
const InvoiceSlip: React.FC<InvoiceSlipInputType> = ({ data }) => {
  return (
    <div style={{ minWidth: '872px' }}>
      <Descriptions
        bordered
        layout="vertical"
        style={{ minWidth: '872px' }}
        // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        size="small"
        column={7}
      >
        <Descriptions.Item span={7} label={<Title level={5}>TAX INVOICE</Title>}>
          <Text strong>{data.bf_name}</Text>
          <br />
          <Text>{`${data.bf_street}, ${data.bf_city}, ${data.bf_state} - ${data.bf_zip}`}</Text>
          <br />
          <Text type="danger">GSTIN- {data.bf_gstin}</Text>
        </Descriptions.Item>

        <Descriptions.Item span={2} label={<Text strong>BILL TO</Text>}>
          <Text strong>{data.bt_name}</Text>
          <br />
          <Text>{`${data.bt_street}, ${data.bt_city}, ${data.bt_state} - ${data.bt_zip}`}</Text>
          <br />
          <Text type="danger">GSTIN- {data.bt_gstin}</Text>
        </Descriptions.Item>
        <Descriptions.Item span={2} label={<Text strong>PLACEOF SUPPLY</Text>}>
          <Text>{`${data.s_street}, ${data.s_city}, ${data.s_state} - ${data.s_zip}`}</Text>
        </Descriptions.Item>
        <Descriptions.Item span={3} label={<Text strong>INVOICE INFO</Text>}>
          <Text strong>Invoice Number: </Text>
          <Text>{data.invoice_no}</Text>
          <br />
          <Text strong>Date: </Text>
          <Text>{data.invoice_date}</Text>
          <br />
          <Text strong>PAN NO: </Text>
          <Text>{data.pan}</Text>
          <br />
          <Text strong>SAC: </Text>
          <Text>{data.sac}</Text>
        </Descriptions.Item>

        <Descriptions.Item span={4} label={<Text strong>PARTICULARS</Text>}>
          <Text strong>{`${data.p_head}`}</Text>
          <br />
          <br />
          <Text>{`${data.p_content}`}</Text>
          {data.p_note ? (
            <>
              <br />
              <br />
              <Text strong>Note:</Text>
              <br />
              <Text>{`${data.p_note}`}</Text>
            </>
          ) : (
            <></>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>AREA ({data.unit})</Text>}>
          <Text>{`${data.area}`}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>RATE/ {data.unit}</Text>}>
          <Text>₹ {data.per_rate}</Text>
        </Descriptions.Item>
        <Descriptions.Item span={2} label={<Text strong>TAXABLE AMOUNT</Text>}>
          <Text>{`₹ ${data.taxable_amount}`}</Text>
        </Descriptions.Item>

        <Descriptions.Item span={4} label={<Text strong>APPLIED TAX TYPE</Text>}>
          <span style={{ color: 'red' }}>
            {data.isIGST ? (
              'IGST @ 18%'
            ) : (
              <div>
                "CGST @ 9%"
                <br />
                "SGST @ 9%"
              </div>
            )}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>TAX VALUE</Text>}>
          {data.isIGST ? (
            data.tax_amount
          ) : (
            <span style={{ color: 'red' }}>
              ₹ {data.tax_amount / 2}
              <br />₹ {data.tax_amount / 2}
            </span>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>TOTAL TAX VALUE</Text>}>
          ₹ {data.tax_amount}
        </Descriptions.Item>
        <Descriptions.Item span={2} label={<Text strong>TOTAL PAYABLE AMOUNT</Text>}>
          <Text strong style={{ color: 'darkgreen' }}>
            ₹ {data.taxed_amount}
          </Text>
        </Descriptions.Item>

        <Descriptions.Item span={7} label={<Text strong>TOTAL PAYABLE AMOUNT</Text>}>
          <Text strong style={{ color: 'darkgreen' }}>
            {data.amount_in_words.toUpperCase()}
          </Text>
        </Descriptions.Item>
      </Descriptions>
      {/* <div style={{ height: '150px', width: '800px' }}> */}
      <div style={{ marginLeft: '10px', height: '250px', marginTop: '70px', marginRight: '100px' }}>
        <Row justify="space-between">
          <Col></Col>
          <Col>
            <Text strong>{`For ${data.bf_name}`}</Text>
          </Col>
        </Row>

        <Divider style={{ borderStyle: 'none' }} />

        {/* <div style={{ width: '0px', height: '70px' }}></div> */}

        <Row justify="space-between">
          <Col>
            <Divider style={{ borderStyle: 'none' }} />
            <Text strong>SUBJECT TO GUWAHATI JURISDICTION</Text>
            <br />
            <Text>E & O.E</Text>
          </Col>
          <Col>
            <Divider style={{ borderTop: '1px solid black' }} />
            <Text strong>{`Authorized Signatory`}</Text>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InvoiceSlip;
