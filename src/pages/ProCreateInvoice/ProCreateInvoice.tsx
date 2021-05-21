import React, { useRef } from 'react';
import { Card, Col, message, Row, Select, Space, Tag, Typography } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { useState } from 'react';
import InvoiceModal from './component/InvoiceModal';
import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { INITIAL_TEST_FORM_VALUES } from '../../constants/InitialValues';
import moment from 'moment';
import styles from './ProCreateInvoice.less';
import { stateData } from './data/state-city';
import Title from 'antd/lib/typography/Title';
import { ProDescriptionsActionType } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
const { Text } = Typography;

const cityData = stateData;
const states = Object.keys(cityData);

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const InvoiceInfoFormSection: React.FC = () => {
  const dateFormat = 'DD/MM/YYYY';
  return (
    <>
      <Row justify="space-between">
        <ProFormText
          rules={[{ required: true }]}
          name="invoice_no"
          label="Invoice Number"
          placeholder="enter invoice number here"
        />
        <Col span={1}></Col>
        <ProFormDatePicker
          rules={[{ required: true }]}
          name="invoice_date"
          label="Date"
          initialValue={moment(moment().toDate(), dateFormat)}
          fieldProps={{ format: dateFormat }}
        />
      </Row>
    </>
  );
};
const AdressFormSection: React.FC<DataProps> = ({ prefix, form }) => {
  const [cities, setCities] = React.useState(cityData[states[3]]);
  // const [secondCity, setSecondCity] = React.useState(cityData[states[0]][0]);

  const handleStateChange = (value: string) => {
    setCities(cityData[value]);
    form.setFieldsValue({ [prefix + '_city']: cityData[value][0] });
    // setSecondCity(cityData[value][0]);
  };

  // const onSecondCityChange = (value: string) => {
  //   setSecondCity(value);
  // };
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
          initialValue={states[0]}
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
const CompanyFormSection: React.FC<DataProps> = ({ prefix, form }) => (
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
        />
      </Col>
    </Row>
    <AdressFormSection prefix={prefix} form={form} />
  </Col>
);

//TODO: change type from any
const RentInfoFormSection: React.FC<DataProps> = ({ form, data, actionRef }) => {
  var isFixed = form.getFieldValue('rent_type') == 'fixed';
  const setTaxableAmount = () => {
    if (!isFixed) {
      form.setFieldsValue({
        taxable_amount: Math.round(form.getFieldValue('area') * form.getFieldValue('per_rate')),
      });
    }
  };
  var isIGST = data?.bf_state === data?.bt_state;
  // var isIGST = form.getFieldValue('bt_state') == form.getFieldValue('bf_state');
  const tax_amount = () => Math.round((form.getFieldValue('taxable_amount') * 18) / 100);
  // var tax_amount = isIGST
  //   ? Math.round((data?.taxable_amount! * 18) / 100)
  //   : 2 * Math.round((data?.taxable_amount! * 9) / 100);
  const taxed_amount = () => form.getFieldValue('taxable_amount') + tax_amount();
  return (
    <Row>
      <Col span={10}>
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
          fieldProps={{
            onChange: (v) =>
              v == 'fixed'
                ? form.setFieldsValue({ taxable_amount: 0 })
                : form.setFieldsValue({ taxable_amount: 0, area: 0, per_rate: 0 }),
          }}
        />
        <ProFormDigit
          rules={[{ required: true }]}
          label="Area int sq. ft."
          name="area"
          placeholder="enter total area"
          initialValue={0}
          disabled={isFixed ? true : false}
          fieldProps={{
            onChange: setTaxableAmount,
          }}
        />
        <ProFormDigit
          rules={[{ required: true }]}
          label="Rate/Unit"
          name="per_rate"
          placeholder="enter per unit price"
          initialValue={0.0}
          disabled={isFixed ? true : false}
          fieldProps={{
            step: '0.001',
            formatter: (value) => `₹ ${value}`,
            onChange: setTaxableAmount,
            parser: (value) => value!.replace('₹ ', ''),
          }}
        />
        <ProFormDigit
          rules={[{ required: true }]}
          label="Taxable Amount :"
          name="taxable_amount"
          placeholder="taxable amount"
          initialValue={0}
          readonly={!isFixed ? true : false}
          fieldProps={{
            formatter: (value) => `₹ ${value}`,
            parser: (value) => value!.replace('₹ ', ''),
          }}
        />
      </Col>
      <Col span={4} />
      <Col>
        <ProDescriptions
          actionRef={actionRef}
          title="Tax Information"
          column={1}
          labelStyle={{ backgroundColor: 'white' }}
          contentStyle={{ color: 'red', fontWeight: 'bold' }}
          bordered
        >
          <ProDescriptions.Item label="Taxable amount">
            {`₹ ${form.getFieldValue('taxable_amount')}`}
          </ProDescriptions.Item>
          {isIGST ? (
            <ProDescriptions.Item label="IGST @ 18%">{`₹ ${tax_amount()}`}</ProDescriptions.Item>
          ) : (
            <>
              <ProDescriptions.Item label="CGST @ 9%">
                {`₹ ${tax_amount() / 2}`}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="SGST @ 9%">
                {`₹ ${tax_amount() / 2}`}
              </ProDescriptions.Item>
            </>
          )}
          <ProDescriptions.Item label="Total tax">{`₹ ${tax_amount()}`}</ProDescriptions.Item>
          <ProDescriptions.Item
            label="Payabal amount"
            contentStyle={{ color: 'green' }}
          >{`₹ ${taxed_amount()}`}</ProDescriptions.Item>
        </ProDescriptions>
        {/* <Text>
          applied tax type:
          <Text type={'danger'}>
            {isIGST
              ? ` IGST @ 18% = ₹ ${tax_amount()} `
              : ` CGST @ 9% = ₹ ${tax_amount() / 2} and SGST @ 9%= ₹ ${tax_amount() / 2} `}
          </Text>
          taxed amount: <Text type={'danger'}> ₹ {taxed_amount()}</Text>
        </Text> */}
      </Col>
    </Row>
  );
};

const SupplyInfoFormSection: React.FC<DataProps> = ({ form }) => {
  const setSupplyAdress = (prefix: string) => {
    try {
      form.setFieldsValue({
        s_street: form.getFieldValue(prefix + '_street'),
        s_city: form.getFieldValue(prefix + '_city'),
        s_state: form.getFieldValue(prefix + '_state'),
        s_zip: form.getFieldValue(prefix + '_zip'),
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
        <AdressFormSection prefix="s" form={form} />
      </Col>
    </Row>
  );
};
const ParticularsFormSection: React.FC<DataProps> = ({ form }) => {
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
export default () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  const [form] = ProForm.useForm();
  const [state, setState] = useState<FormStateTypes>({
    ...INITIAL_FORM_VALUES,
  });
  const checkForm = async () =>
    await form
      .validateFields()
      .then((val) => true)
      .catch((_) => false);
  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <ProForm
            form={form}
            onValuesChange={(changedValue, allFields) => {
              setState((prevState) => ({
                ...prevState,
                ...allFields,
              }));
              console.log(changedValue);
            }}
            requiredMark="optional"
            onReset={(e) => {
              actionRef.current?.reload();
            }}
            onFinish={async (values: FormStateTypes) => {
              setState((prevState) => ({
                ...prevState,
                isSubmitting: true,
              }));
              await waitTime(100);
              setState((prevState) => ({
                ...prevState,
                isSubmitting: true,
                submited: true,
              }));
              // await createInvoice({ ...values });
              console.log(values);
              message.success('Submitted successfully');
            }}
            submitter={{
              searchConfig: {
                submitText: 'Submit',
              },
              render: (_, dom) => (
                <>
                  <InvoiceModal
                    setData={setState}
                    data={state}
                    children={dom.pop()}
                    checkInputForm={checkForm}
                  />
                  {dom}
                </>
              ),
              // submitButtonProps: {
              //   size: 'large',
              //   style: {
              //     width: '100%',
              //   },
              // },
            }}
            initialValues={INITIAL_FORM_VALUES}
          >
            <Card title={<Title level={4}>Create Invoice</Title>} style={{ textAlign: 'center' }}>
              <InvoiceInfoFormSection />
            </Card>
            <Row>
              <Col span={12}>
                <Card title="Billing From">
                  <CompanyFormSection prefix="bf" form={form} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Billing To">
                  <CompanyFormSection prefix="bt" form={form} />
                </Card>
              </Col>
            </Row>
            <Card title="Supply Info">
              <SupplyInfoFormSection form={form} />
            </Card>
            <Card title="Rent Info">
              <RentInfoFormSection form={form} data={state} actionRef={actionRef} />
            </Card>
            <Card title="Particulars">
              <ParticularsFormSection form={form} />
            </Card>
          </ProForm>
        </Col>
      </Row>
    </>
  );
};
