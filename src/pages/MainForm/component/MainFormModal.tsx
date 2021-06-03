import React from "react";
import { Button, Card, Col, message, Modal, Row, Typography, Space } from 'antd';
import ButtonGroup from "antd/lib/button/button-group";
import CompanyFormSection from "./common/CompanySection";
import InvoiceInfoFormSection from "./InvoiceSection";
import ParticularsFormSection from "./common/ParticularsSection";
import RentInfoFormSection from "./common/RentSection";
import SupplyInfoFormSection from "./SupplySection";
import ProForm from '@ant-design/pro-form';

import { useModel } from 'umi';
import { MyFormData } from '@/models/types';
import { INITIAL_FORM_VALUES, INITIAL_TEST_FORM_VALUES } from "@/models/InitialValues";
import { MainFormContext } from "./common/context/MainFormContext";
import InvoiceModal from "./MainSubmitModal";
import { addInvoice, deleteDb } from "@/services/db-services/mainDB";
import { PlusSquareOutlined } from "@ant-design/icons";
const { Title } = Typography;


export default (props: any) => {
  const [form] = ProForm.useForm();
  const [visible, setVisible] = React.useState(false);
  const { formState, setFormState }: MyFormData = useModel('form');
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

  const putFormInvoiceData = async (data: any) => {
    await addInvoice({
      ...data.doc,
    });
    // console.log('in add invoice: ', invoices);

    message.success('invoice added');
    return { ok: 'ok' };
  };

  return (
    <>
      <ButtonGroup>
        <Button type="primary" onClick={showModal} icon={<PlusSquareOutlined />}>
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
            });
            setVisible(false);
            setFormState(INITIAL_FORM_VALUES);
            form.resetFields();
            message.success('Submitted successfully');
          }}
          submitter={{
            searchConfig: {
              submitText: 'Submit',
            },
            render: (props, dom) => (
              <Row justify="end">
                <Space>
                  <Button type="default" onClick={handleOk}>return</Button>

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
                  <Button danger onClick={
                    async () => {
                      await deleteDb();
                      setFormState({ ...INITIAL_FORM_VALUES });
                      form.resetFields();
                      message.success("db deleted succesfully")
                    }
                  }>Delete db</Button>
                  <InvoiceModal
                    setData={setFormState}
                    setVisible={setVisible}
                    visible={visible}
                    formRef={props.form}
                    data={formState}
                    children={dom.pop()}
                    checkInputForm={checkForm}
                  />
                </Space>
              </Row>
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