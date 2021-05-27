import { Card, Col, message, Row, Typography, Button } from 'antd';
import ProForm from '@ant-design/pro-form';
import styles from './InvoiceForm.less';
import { useState } from 'react';
import InvoiceModal from './component/MainSubmitModal';
import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { INITIAL_TEST_FORM_VALUES } from '../../constants/InitialValues';
import Title from 'antd/lib/typography/Title';
import { InvoiceFormContext } from './component/context/MainFormContext';
import CompanyFormSection from './component/CompanySection';
import InvoiceInfoFormSection from './component/InvoiceSection';
import ParticularsFormSection from './component/ParticularsSection';
import RentInfoFormSection from './component/RentSection';
import SupplyInfoFormSection from './component/SupplySection';
import { useModel } from 'umi';
import { MyFormData } from '@/models/types';
import MainTable from './component/MainTable';
import { getFiscalYear } from '@/utils/utils';
import React from 'react';
const { Text } = Typography;

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [form] = ProForm.useForm();
  const [visible, setVisible] = React.useState(false);
  const { formState, setFormState }: MyFormData = useModel('form');
  const { formInvoices, setFormInvoices } = useModel('formInvoices');
  // const { isEmpty, getLastID, addID } = useModel('formIdCounterDb')
  // const [formState, setFormState] = useState<FormStateTypes>(INITIAL_FORM_VALUES);
  const demo = useModel('demo');
  const { } = useModel('counter'); //used to rerender this component evenunused
  const checkForm = async () =>
    await form
      .validateFields()
      .then((val) => true)
      .catch((_) => false);
  return (
    <Row justify="center">
      <Col span={24}>
        <ProForm
          form={form}
          // onValuesChange={(changedValue, allFields) => {
          //   setFormState((prevState) => ({
          //     ...prevState,
          //     ...changedValue,
          //   }));
          //   console.log(changedValue);
          // }}
          requiredMark="optional"
          onReset={async (e) => {
            setFormState(INITIAL_FORM_VALUES);
            // var id = await getLastID()
            // form.setFieldsValue({ 'invoice_no': (parseFloat(id) + 1).toString() })
          }}
          onFinish={async (values: FormStateTypes) => {
            setFormInvoices((pv) => ({
              ...pv,
              [values.invoice_no ? values.invoice_no : "0001"]: {
                ...formState,
                ...values,
              },
            }));
            // await addID();
            setVisible(false);
            setFormState(INITIAL_FORM_VALUES);
            form.resetFields();
            // var id = await getLastID()
            // form.setFieldsValue({ 'invoice_no': (parseFloat(id) + 1).toString() })
            console.log(values);
            message.success('Submitted successfully');
          }}
          submitter={{
            searchConfig: {
              submitText: 'Submit',
            },
            render: (props, dom) => (
              <>
                <InvoiceModal
                  setData={setFormState}
                  setVisible={setVisible}
                  visible={visible}
                  formRef={props.form}
                  data={formState}
                  children={dom.pop()}
                  checkInputForm={checkForm}
                />
                {dom}
                <Button
                  type="primary"
                  ghost
                  onClick={(e) => {
                    form.setFieldsValue(INITIAL_TEST_FORM_VALUES);
                    setFormState((prevData) => ({
                      ...INITIAL_TEST_FORM_VALUES,
                      invoice_date: form.getFieldValue('invoice_date').format('DD/MM/YYYY'),
                    }));
                  }}
                >
                  Fill Form
                </Button>
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
          <InvoiceFormContext.Provider value={{ formRef: form }}>
            <Card title={<Title level={4}>Create Invoice</Title>} style={{ textAlign: 'center' }}>
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
              <SupplyInfoFormSection />
            </Card>
            <Card title="Rent Info">
              <RentInfoFormSection />
            </Card>
            <Card title="Particulars">
              <ParticularsFormSection />
            </Card>
          </InvoiceFormContext.Provider>
        </ProForm>
      </Col>
      <Col>
        <MainTable />
      </Col>
    </Row>
  );
};
