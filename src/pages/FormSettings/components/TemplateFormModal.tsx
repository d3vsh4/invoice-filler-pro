import { INITIAL_FORM_VALUES } from '@/models/InitialValues';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, message, Row, Col, Card } from 'antd';
import { useModel } from 'umi';
import CompanyFormSection from '@/pages/common/CompanySection';
import { MainFormContext } from '@/pages/common/context/MainFormContext';
import ParticularsFormSection from '@/pages/common/ParticularsSection';
import RentInfoFormSection from '@/pages/common/RentSection';
import SupplyInfoFormSection from '@/pages/common/SupplySection';
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
  // console.log(initialValues);

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
          if (edit)
            await updateTemplate({
              ...values,
            });
          else
            await addTemplate({
              ...values,
            });
          setLoading ? setLoading(false) : null;
          return true;
        }}
      >
        <MainFormContext.Provider value={{ formRef: formRef.current }}>
          <Row>
            {/* <Col span={24}> */}
              {/* <Card title="Party Details">
                <ProFormText
                  rules={[{ required: true }]}
                  name={'t_name'}
                  label="Party Name"
                  placeholder="Please enter the name"
                  readonly={edit}
                  fieldProps={{ 
                    onChange: (v) => {
                      // formRef.setFieldsValue({ area: 0, per_rate: 0, taxable_amount: 0 });
                      // setRentType(v);
                    },
                   }}
                />
              </Card> */}
            {/* </Col> */}
            {/* <Col span={12}>
              <Card title="Billing From">
                <CompanyFormSection prefix="bf" readonly={true} />
              </Card>
            </Col> */}
            <Col span={12}>
              <Card title="Party Details">
                <CompanyFormSection prefix="bt" isTemplate={true} />
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
