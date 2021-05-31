import { Card, Col, message, Row, Typography, Button } from 'antd';
import ProForm from '@ant-design/pro-form';
import styles from './InvoiceForm.less';
import { useState, useEffect } from 'react';
import InvoiceModal from './component/MainSubmitModal';
import { INITIAL_FORM_VALUES } from '@/models/InitialValues';
import { INITIAL_TEST_FORM_VALUES } from '../../models/InitialValues';
import Title from 'antd/lib/typography/Title';
import { MainFormContext } from './component/context/MainFormContext';
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
  const { getInvoiceFormData, putFormInvoiceData } = useModel('formInvoices');
  const { addInvoice, showInvoices, getLastId, deleteDb } = useModel('db')
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
            await putFormInvoiceData({
              doc: {
                ...formState,
                ...values,
              },
              id: values.invoice_no,
              key: values.invoice_no,
            }, values.invoice_no!);
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
                <Button type="dashed" onClick={
                  async () => {
                    await deleteDb();
                    message.success("db deleted succesfully")
                  }
                }>Delete db</Button>
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
          { }
          <MainFormContext.Provider value={{ formRef: form }}>
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
          </MainFormContext.Provider>
        </ProForm>
      </Col>
      <Col>
        <MainTable />
      </Col>
    </Row>
  );
};
