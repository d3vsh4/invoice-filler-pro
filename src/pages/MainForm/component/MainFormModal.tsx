import React from "react";
import { Button, Card, Col, message, Modal, Row, Typography } from 'antd';
import { useState } from 'react';
import ButtonGroup from "antd/lib/button/button-group";
import CompanyFormSection from "./CompanySection";
import InvoiceInfoFormSection from "./InvoiceSection";
import ParticularsFormSection from "./ParticularsSection";
import RentInfoFormSection from "./RentSection";
import SupplyInfoFormSection from "./SupplySection";
import ProForm from '@ant-design/pro-form';

import { useModel } from 'umi';
import { MyFormData } from '@/models/types';
import { INITIAL_FORM_VALUES, INITIAL_TEST_FORM_VALUES } from "@/models/InitialValues";
import { MainFormContext } from "./context/MainFormContext";
import InvoiceModal from "./MainSubmitModal";
const { Title } = Typography;


export default (props: any) => {
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

  // const [mainVisible, setMainVisible] = useState(false);
  const { mainVisible, setMainVisible } = props.mainVisibility
  const showModal = () => setMainVisible(true);
  const handleOk = () => {
    setMainVisible(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setMainVisible(false);
  };
  return (
    <>
      <ButtonGroup>
        <Button type="primary" onClick={showModal}>
          Create Invoice
        </Button>
      </ButtonGroup>
      <Modal
        visible={mainVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[

        ]}
        width={1124}
      >
        <ProForm
          form={form}
          requiredMark="optional"
          onReset={async (e) => {
            setFormState(INITIAL_FORM_VALUES);
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
                    setFormState({ ...INITIAL_FORM_VALUES });
                    form.resetFields();
                    message.success("db deleted succesfully")
                  }
                }>Delete db</Button>
                <Button type="primary" onClick={handleOk}>Done</Button>
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

      </Modal>
    </>
  );
}