import { Card, Col, message, Row, Typography } from 'antd';
import ProForm from '@ant-design/pro-form';
import { useState } from 'react';
import InvoiceModal from './component/InvoiceModal';
import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { INITIAL_TEST_FORM_VALUES } from '../../constants/InitialValues';
import Title from 'antd/lib/typography/Title';
import { ProCreateInvoiceContext } from './context/ProCreateInvoiceContext';
import CompanyFormSection from './component/CompanySection';
import InvoiceInfoFormSection from './component/InvoiceSection';
import ParticularsFormSection from './component/ParticularsSection';
import RentInfoFormSection from './component/RentSection';
import SupplyInfoFormSection from './component/SupplySection';
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
  const [formState, setFormState] = useState<FormStateTypes>({
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
              // console.log(form.getFieldsValue(), allFields);
              setFormState((prevState) => ({
                ...prevState,
                ...allFields,
              }));
              console.log(changedValue);
            }}
            requiredMark="optional"
            onReset={(e) => {
              setFormState(INITIAL_FORM_VALUES);
            }}
            onFinish={async (values: FormStateTypes) => {
              setFormState((prevState) => ({
                ...prevState,
                isSubmitting: true,
              }));
              await waitTime(100);
              setFormState((prevState) => ({
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
              render: (props, dom) => (
                <>
                  <InvoiceModal
                    setData={setFormState}
                    formRef={props.form}
                    data={formState}
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
            <ProCreateInvoiceContext.Provider value={{ formRef: form }}>
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
                <RentInfoFormSection data={formState} />
              </Card>
              <Card title="Particulars">
                <ParticularsFormSection />
              </Card>
            </ProCreateInvoiceContext.Provider>
          </ProForm>
        </Col>
      </Row>
    </>
  );
};
