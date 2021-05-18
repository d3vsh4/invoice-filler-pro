import React from 'react';
import { Card, message, Row, Space, Tag, Typography } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormGroup,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormRadio,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import InvoiceModal from './component/InvoiceModal';
import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { INITIAL_TEST_FORM_VALUES } from '../../constants/InitialValues';

const { Text } = Typography;
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CompanyFormSection: React.FC<AddressProps> = ({ prefix }) => (
  <>
    <ProFormGroup>
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_name'}
        width="md"
        label="Company Name"
        placeholder="Please enter the name"
        readonly={prefix == 'bf' ? true : undefined}
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name={prefix + '_gstin'}
        label="GSTIN"
        placeholder="Please enter the GSTIN no."
        readonly={prefix == 'bf' ? true : undefined}
      />
    </ProFormGroup>
    <AdressFormSection prefix={prefix} />
  </>
);
const AdressFormSection: React.FC<AddressProps> = ({ prefix }) => (
  <>
    <ProFormText
      rules={[{ required: true }]}
      name={prefix + '_street'}
      label="Street Address"
      placeholder="Please enter the Street address"
      readonly={prefix == 'bf' ? true : undefined}
    />
    <ProFormGroup>
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_city'}
        label="City"
        placeholder="Please enter the city"
        readonly={prefix == 'bf' ? true : undefined}
      />
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_state'}
        label="State"
        placeholder="enter state"
        readonly={prefix == 'bf' ? true : undefined}
      />
      <ProFormText
        rules={[{ required: true }]}
        name={prefix + '_zip'}
        label="Postal/Zip Code"
        placeholder="enter postal/zip"
        readonly={prefix == 'bf' ? true : undefined}
      />
    </ProFormGroup>
  </>
);
//TODO: change type from any
const RentInfoFormSection: React.FC<any> = ({ form }) => {
  var isFixed = form.getFieldValue('rent_type') == 'fixed';
  const setTaxableAmount = () => {
    if (!isFixed) {
      form.setFieldsValue({
        taxable_amount: Math.ceil(form.getFieldValue('area') * form.getFieldValue('per_rate')),
      });
    }
  };
  return (
    <>
      <ProFormGroup>
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
          /*
          <Typography.Text>
              Taxable Amount :{' ~ ₹ '}
              <Typography.Text copyable type="secondary">
                {amount > 0 ? amount : 0}
              </Typography.Text>
            </Typography.Text>
          */
          name="taxable_amount"
          placeholder="taxable amount"
          initialValue={0}
          readonly={!isFixed ? true : false}
          fieldProps={{
            formatter: (value) => `₹ ${value}`,
            parser: (value) => value!.replace('₹ ', ''),
          }}
        />
      </ProFormGroup>
    </>
  );
};
const ParticularsFormSection: React.FC<any> = ({ form }) => {
  return (
    <>
      <ProFormText
        rules={[{ required: true }]}
        name="p_head"
        label="Heading"
        width="xl"
        placeholder="enter heading"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        name="p_content"
        label="Content"
        width="xl"
        placeholder="write content here"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        name="p_note"
        label="Note"
        width="xl"
        placeholder="write note here"
      />
    </>
  );
};
const InvoiceInfoFormSection: React.FC = () => {
  return (
    <>
      <ProFormGroup>
        <ProFormText
          rules={[{ required: true }]}
          name="invoice_no"
          label="Invoice Number"
          placeholder="enter invoice number here"
        />
        <ProFormText
          rules={[{ required: true }]}
          name="invoice_date"
          label="Date"
          placeholder="enter date here"
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
      </ProFormGroup>
    </>
  );
};
const SupplyInfoFormSection: React.FC<any> = ({ form }) => {
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
    <>
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
      <AdressFormSection prefix="s" />
    </>
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
    <PageContainer>
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
            await waitTime(2000);
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
          initialValues={INITIAL_TEST_FORM_VALUES}
        >
          <Card title="Invoice Info">
            <ProFormGroup>
              <InvoiceInfoFormSection />
            </ProFormGroup>
          </Card>
          <Card title="Billing From">
            <ProFormGroup>
              <CompanyFormSection prefix="bf" />
            </ProFormGroup>
          </Card>
          <Card title="Billing To">
            <ProFormGroup>
              <CompanyFormSection prefix="bt" />
            </ProFormGroup>
          </Card>
          <Card title="Supply Info">
            <ProFormGroup>
              <SupplyInfoFormSection form={form} />
            </ProFormGroup>
          </Card>
          <Card title="Rent Info">
            <ProFormGroup>
              <RentInfoFormSection form={form} />
            </ProFormGroup>
          </Card>
          <Card title="Particulars">
            <ProFormGroup>
              <ParticularsFormSection form={form} />
            </ProFormGroup>
          </Card>
        </ProForm>
      </Row>
    </PageContainer>
  );
};
