import { INITIAL_FORM_VALUES } from '@/models/InitialValues';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, message, Row, Col, Card } from 'antd';
import { useModel } from 'umi';
import CompanyFormSection from './common/CompanySection';
import { MainFormContext } from './common/context/MainFormContext';
import ParticularsFormSection from './common/ParticularsSection';
import RentInfoFormSection from './common/RentSection';
import SupplyInfoFormSection from './SupplySection';
import { useReducer, useRef, useState } from 'react';
import { FormInstance } from 'antd';
import { addTemplate, updateTemplate } from '@/services/db-services/templateDB';

type PropsType = {
  initialValues: FormStateTypes;
  edit?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};
export default (props: PropsType) => {
  const { initialValues, edit, setLoading } = props;
  console.log(initialValues);

  const formRef = useRef<FormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <ModalForm
        title="Add Options"
        width={1200}
        formRef={formRef}
        onVisibleChange={setModalVisible}
        trigger={
          <Button
            type="primary"
            icon={edit ? <EditOutlined /> : null}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            {!edit ? <PlusOutlined /> : null}
            {edit ? 'Edit' : 'Add Options'}
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
          setLoading ? setLoading(true) : null;
          if (edit) await updateTemplate({
            ...values,
          })
          else await addTemplate({
            ...values,
          })
          setLoading ? setLoading(false) : null;
          return true;
        }}
      >
        <MainFormContext.Provider value={{ formRef: formRef.current }}>
          <Row>
            <Col span={24}>
              <Card title="Template Details">
                <ProFormText
                  rules={[{ required: true }]}
                  name={'t_name'}
                  label="Template Name"
                  placeholder="Please enter the name"
                  readonly={edit}
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
        </MainFormContext.Provider>
      </ModalForm>
    </>
  );
};
