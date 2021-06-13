import { Col, Descriptions, Divider, Row, Typography } from 'antd';
import React from 'react';
const { Text, Title } = Typography;
const { Item } = Descriptions;
type InvoiceSlipInputType = {
  data: FormStateTypes;
};
const InvoiceSlip: React.FC<InvoiceSlipInputType> = ({ data }) => {
  return (
    <div>
      <Descriptions
        bordered
        style={{ minWidth: '900px' }}
        layout="vertical"
        // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        size="small"
        column={8}
      >
        <Item span={8} label={<Title level={5}>TAX INVOICE</Title>} style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Text strong>{data.bf_name}</Text>
            {/* <br /> */}
            <Text>{`${data.bf_street}, ${data.bf_city}, ${data.bf_state} - ${data.bf_zip}`}</Text>
            {/* <br /> */}
            <Text type="danger">GSTIN- {data.bf_gstin}</Text>
            {/* <br /> */}
            <Text>
              <Text strong>Email:</Text> swasticluvricant@gmail.com
            </Text>
          </div>
        </Item>

        <Item span={2} label={<Text strong>BILL TO</Text>}>
          <Text strong>{data.bt_name}</Text>
          <br />
          <Text>{`${data.bt_street}, ${data.bt_city}, ${data.bt_state} - ${data.bt_zip}`}</Text>
          <br />
          <Text type="danger">GSTIN- {data.bt_gstin}</Text>
        </Item>
        <Item span={2} label={<Text strong>PLACEOF SUPPLY</Text>}>
          <Text>{`${data.s_street}, ${data.s_city}, ${data.s_state} - ${data.s_zip}`}</Text>
        </Item>
        <Item span={4} label={<Text strong>INVOICE INFO</Text>}>
          <Text strong>Invoice Number: </Text>
          <Text>{data.invoice_no}</Text>
          <br />
          <Text strong>Date: </Text>
          <Text>{`${data.invoice_date}`}</Text>
          <br />
          <Text strong>PAN NO: </Text>
          <Text>{data.pan}</Text>
        </Item>

        <Item span={3} label={<Text strong>PARTICULARS</Text>}>
          <Text strong>{`${data.p_head}`}</Text>
          <br />
          <br />
          <Text>{data.p_content}</Text>
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
        </Item>
        <Item span={1} label={<Text strong>SAC </Text>}>
          <Text>{data.sac}</Text>
        </Item>
        <Item
          style={{ width: '88px' }}
          span={1}
          label={<Text strong>AREA ({data.unit.toUpperCase()})</Text>}
        >
          <Text>{`${data.area}`}</Text>
        </Item>
        <Item span={2} label={<Text strong>RATE/ {data.unit.toUpperCase()}</Text>}>
          <Text>
            ₹ {data.per_rate.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}
          </Text>
        </Item>
        <Item span={2} label={<Text strong>TAXABLE AMOUNT</Text>}>
          <Text>{`₹ ${data.taxable_amount
            .toString()
            .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}`}</Text>
        </Item>

        {/* <Item span={4} label={<Text strong>APPLIED TAX TYPE</Text>}> */}
        <Item span={4}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ color: 'red' }}>
              {!data.isSameState ? (
                'IGST @ 18%'
              ) : (
                <>
                  CGST @ 9%
                  <br />
                  SGST @ 9%
                </>
              )}
            </span>
          </div>
        </Item>
        <Item span={2} label={<Text strong>TAX VALUE</Text>}>
          {!data.isSameState ? (
            data.tax_amount.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          ) : (
            <span style={{ color: 'red' }}>
              {`₹ ${(data.tax_amount / 2)
                .toString()
                .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}`}
              <br />₹{' '}
              {(data.tax_amount / 2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}
            </span>
          )}
        </Item>
        <Item span={2} label={<Text strong>TOTAL TAX VALUE</Text>}>
          ₹ {data.tax_amount.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}
        </Item>

        <Item span={5} label={<Text strong>TOTAL PAYABLE AMOUNT IN WORDS</Text>}>
          <Text strong style={{ color: 'darkgreen' }}>
            {data.amount_in_words.toUpperCase()}
          </Text>
        </Item>
        <Item label={<Text strong>TOTAL PAYABLE AMOUNT</Text>}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Text strong style={{ color: 'darkgreen' }}>
              ₹ {data.taxed_amount.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}
            </Text>
          </div>
        </Item>
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
