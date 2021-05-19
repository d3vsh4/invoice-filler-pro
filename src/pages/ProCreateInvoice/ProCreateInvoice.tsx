import React from 'react';
import { Card, Col, message, Row, Space, Tag, Typography } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormGroup,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormRadio,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import InvoiceModal from './component/InvoiceModal';
import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { INITIAL_TEST_FORM_VALUES } from '../../constants/InitialValues';
import moment from 'moment';

const { Text } = Typography;
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
type DataProps = {
  form?: any;
  data?: FormStateTypes;
};
const CompanyFormSection: React.FC<AddressProps> = ({ prefix }) => (
  <Col>
    <Row>
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_name'}
        // width="md"
        label="Company Name"
        placeholder="Please enter the name"
      />
      <ProFormText
        rules={[{ required: true }]}
        // width="md"
        name={prefix + '_gstin'}
        label="GSTIN"
        placeholder="Please enter the GSTIN no."
      />
    </Row>
    <AdressFormSection prefix={prefix} />
  </Col>
);
const AdressFormSection: React.FC<AddressProps> = ({ prefix }) => (
  <>
    <ProFormText
      rules={[{ required: true }]}
      name={prefix + '_street'}
      label="Street Address"
      placeholder="Please enter the Street address"
    />
    <Row>
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_city'}
        label="City"
        placeholder="Please enter the city"
      />
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_state'}
        label="State"
        placeholder="enter state"
      />
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_zip'}
        label="Postal/Zip Code"
        placeholder="enter postal/zip"
      />
    </Row>
  </>
);
//TODO: change type from any
const RentInfoFormSection: React.FC<DataProps> = ({ form, data }) => {
  var isFixed = form.getFieldValue('rent_type') == 'fixed';
  const setTaxableAmount = () => {
    if (!isFixed) {
      form.setFieldsValue({
        taxable_amount: Math.ceil(form.getFieldValue('area') * form.getFieldValue('per_rate')),
      });
    }
  };
  var isIGST = data?.bf_state === data?.bt_state;
  // var isIGST = form.getFieldValue('bt_state') == form.getFieldValue('bf_state');
  var tax_amount = isIGST
    ? Math.ceil((form.getFieldValue('taxable_amount') * 18) / 100)
    : 2 * Math.ceil((form.getFieldValue('taxable_amount') * 9) / 100);
  // var tax_amount = isIGST
  //   ? Math.ceil((data?.taxable_amount! * 18) / 100)
  //   : 2 * Math.ceil((data?.taxable_amount! * 9) / 100);
  var taxed_amount = Math.ceil(form.getFieldValue('taxable_amount')) + tax_amount;
  return (
    <>
      <Row justify="space-around">
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
        <ProFormText
          rules={[{ required: true }]}
          name="pan"
          label="PAN"
          placeholder="enter PAN here"
          readonly
        />
        <ProFormText
          rules={[{ required: true }]}
          name="sac"
          label="SAC"
          placeholder="enter SAC here"
          readonly
        />
      </Row>
      <Text>
        applied tax type:
        <Text type={'danger'}>
          {isIGST
            ? ` IGST @ 18% = ₹ ${tax_amount} `
            : ` CGST @ 9% = ₹ ${tax_amount / 2} and SGST @ 9%= ₹ ${tax_amount / 2} `}
        </Text>
        taxed amount: <Text type={'danger'}> ₹ {taxed_amount}</Text>
      </Text>
    </>
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
        rules={[{ required: true }]}
        name="p_note"
        label="Note"
        // width="xl"
        placeholder="write note here"
      />
    </>
  );
};
const InvoiceInfoFormSection: React.FC = () => {
  const dateFormat = 'DD/MM/YYYY';
  return (
    <>
      <Row>
        <ProFormText
          rules={[{ required: true }]}
          name="invoice_no"
          label="Invoice Number"
          placeholder="enter invoice number here"
        />
        {/* <DatePicker defaultValue={moment('01/01/2015', dateFormat)} format={dateFormatList} /> */}
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
      <Col>
        <AdressFormSection prefix="s" />
      </Col>
    </Row>
  );
};
export default () => {
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
          <Card title="Invoice Info">
            <InvoiceInfoFormSection />
          </Card>
          <Row>
            <Col span={12}>
              <Card title="Billing From">
                <CompanyFormSection prefix="bf" />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Billing To">
                <CompanyFormSection prefix="bt" />
              </Card>
            </Col>
          </Row>
          <Card title="Supply Info">
            <SupplyInfoFormSection form={form} />
          </Card>
          <Card title="Rent Info">
            <RentInfoFormSection form={form} data={state} />
          </Card>
          <Card title="Particulars">
            <ParticularsFormSection form={form} />
          </Card>
        </ProForm>
      </Row>
      {/* </Row> */}
    </>
  );
};
