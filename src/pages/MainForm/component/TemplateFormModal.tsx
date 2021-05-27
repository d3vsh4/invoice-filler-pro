import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, message, Row, Col, Card } from 'antd';
import { useModel } from 'umi';
import CompanyFormSection from './CompanySection';
import { InvoiceFormContext } from './context/MainFormContext';
import ParticularsFormSection from './ParticularsSection';
import RentInfoFormSection from './RentSection';
import SupplyInfoFormSection from './SupplySection';
import { useReducer, useRef, useState } from 'react';
import { FormInstance } from 'antd';

type PropsType = {
  initialValues: FormStateTypes;
  edit?: boolean;
};
export default (props: PropsType) => {
  const { initialValues, edit } = props;
  const formRef = useRef<FormInstance>();
  const [formState, setFormStates] = useState<FormStateTypes>(initialValues);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { formTemplates, setFormTemplates } = useModel('formTemplates');
  // const { increment, counter } = useModel('counter'); //used to rerender this component even unused

  const setFormStatesIndirect = (values: any) => {
    setFormStates((pv) => ({
      ...pv,
      ...values,
      template_info: {
        name: values.t_name,
        id: new Date().getUTCMilliseconds(),
      },
    }));
  };
  const setFormTemplatesIndirect = (values: any) => {
    setFormTemplates((pv) => ({
      ...pv,
      [values.t_name]: {
        ...formState,
        ...values,
      },
    }));
  };
  return (
    <>
      <ModalForm
        title="Add Template"
        width={1200}
        formRef={formRef}
        onVisibleChange={setModalVisible}
        trigger={
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <PlusOutlined />
            {edit ? 'edit' : 'Add Template'}
          </Button>
        }
        // onValuesChange={(cv, v) => {
        // }}
        initialValues={initialValues}
        submitter={{
          searchConfig: {
            resetText: 'Reset',
          },
          resetButtonProps: {
            onClick: () => {
              formRef.current?.resetFields();
              setModalVisible(false);
            },
          },
        }}
        onFinish={async (values) => {
          console.log(values);
          //   setFormStatesIndirect(values);
          console.log(formState);
          //   await waitTime(200);
          setFormTemplatesIndirect(values);
          message.success('Saved');
          return true;
        }}
      >
        <InvoiceFormContext.Provider value={{ formRef: formRef.current }}>
          <Row>
            <Col span={24}>
              <Card title="Template Details">
                <ProFormText
                  rules={[{ required: true }]}
                  name={'t_name'}
                  label="Template Name"
                  placeholder="Please enter the name"
                // readonly={edit}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Billing From">
                <CompanyFormSection prefix="bf" readonly={true} />
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
      </ModalForm>
    </>
  );
};
