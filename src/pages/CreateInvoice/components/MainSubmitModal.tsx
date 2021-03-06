import { Button, Modal, Space } from 'antd';
import React from 'react';
import GenPrint from '@/components/common/GenPrint';
import ButtonGroup from 'antd/es/button/button-group';
import InvoiceSlip from '@/pages/common/MainSlip';
import { convertRupeeToWords, gst18, toFixDec } from '@/utils/utils';
import { FormInstance } from '@ant-design/pro-form';

export type MainSubmitModalType = {
  setData: React.Dispatch<React.SetStateAction<FormStateTypes>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  formRef?: FormInstance;
  data: FormStateTypes;
  children: Element[] | React.ReactNode;
  checkInputForm: any;
};

const MainSubmitModal: React.FC<MainSubmitModalType> = (props) => {
  const { visible, setVisible } = props;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const calculateData = (props: MainSubmitModalType) => {
    return new Promise((resolve, reject) => {
      try {
        // const [taxable_amount, bt_state, bf_state] = props.data;
        const toChange = {
          isSameState: false,
          per_rate: 0,
          area: 0,
          taxable_amount: 0,
          tax_amount: 0,
          taxed_amount: 0,
          amount_in_words: '',
        };

        if (props.data.bt_state == props.data.bf_state) {
          toChange.isSameState = true;
        }
        toChange.per_rate = toFixDec(props.formRef?.getFieldValue('per_rate'), 3);
        toChange.area = toFixDec(props.formRef?.getFieldValue('area'), 2);
        toChange.taxable_amount = Math.round(props.formRef?.getFieldValue('taxable_amount'));
        toChange.tax_amount = gst18(toChange.taxable_amount);
        toChange.taxed_amount = toChange.taxable_amount + toChange.tax_amount;
        toChange.amount_in_words = convertRupeeToWords(`${toChange.taxed_amount}`);
        // toChange.amount_in_words = convertRupeeToWords(`${props.data.taxed_amount}`);
        props.setData((prevData) => ({
          ...prevData,
          ...props.formRef?.getFieldsValue(),
          ...toChange,
          invoice_date: props.formRef?.getFieldValue('invoice_date').format('DD/MM/YYYY'),
        }));
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  };

  const showModal = async () => {
    // console.log(props.data);

    if (await props.checkInputForm()) {
      if (await calculateData(props)) {
        setVisible(true);
      }
    }
  };

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //     setConfirmLoading(false);
  //   }, 8000);
  // };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <ButtonGroup>
        <Button type="primary" onClick={showModal} >
          Preview & Submit
        </Button>
      </ButtonGroup>
      <Modal
        // title="Tax Invoice"
        visible={visible}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1124}
        // style={{ minWidth: '1000px' }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Space>{props.children}</Space>, //the buttons from the form like submit
        ]}
      >
        <GenPrint>
          <InvoiceSlip data={props.data} />
        </GenPrint>
      </Modal>
    </>
  );
};

export default MainSubmitModal;
