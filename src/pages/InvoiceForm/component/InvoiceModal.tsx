import { Button, Modal, Space } from 'antd';
import React from 'react';
import GenPrint from '@/components/common/GenPrint';
import ButtonGroup from 'antd/es/button/button-group';
import InvoiceSlip from '@/components/common/InvoiceSlip';
import { convertRupeeToWords } from '@/utils/utils';
import { FormInstance } from 'antd/es/form/Form';

type InvoiceModal = {
  setData: React.Dispatch<React.SetStateAction<FormStateTypes>>;
  formRef?: FormInstance;
  data: FormStateTypes;
  children: Element[] | React.ReactNode;
  checkInputForm: any;
};
const InvoiceModal: React.FC<InvoiceModal> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const calculateData = () => {
    return new Promise((resolve, reject) => {
      try {
        // const [taxable_amount, bt_state, bf_state] = props.data;
        const toChange = {
          isSameState: false,
          tax_amount: 0,
          taxable_amount: 0,
          taxed_amount: 0,
          amount_in_words: '',
          per_rate: 0,
        };

        if (props.data.bt_state == props.data.bf_state) {
          toChange.isSameState = true;
        }
        toChange.per_rate =
          Math.round((props.formRef?.getFieldValue('per_rate') + Number.EPSILON) * 1000) / 1000;
        toChange.taxable_amount = Math.round(props.formRef?.getFieldValue('taxable_amount'));
        toChange.tax_amount = Math.round((toChange.taxable_amount * 18) / 100);
        toChange.taxed_amount = toChange.taxable_amount + toChange.tax_amount;
        toChange.amount_in_words = convertRupeeToWords(`${toChange.taxed_amount}`);
        props.setData((prevData) => ({
          ...prevData,
          ...toChange,
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
    // props.setData((prevData) => ({
    //   ...prevData,
    //   ...props.formRef?.getFieldsValue(),
    //   invoice_date: props.formRef?.getFieldValue('invoice_date').format('DD/MM/YYYY'),
    // }));
    if (await props.checkInputForm()) {
      if (await calculateData()) {
        setVisible(true);
      }
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 8000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <ButtonGroup>
        <Button type="primary" onClick={showModal}>
          Create Invoice
        </Button>
      </ButtonGroup>
      <Modal
        // title="Tax Invoice"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        style={{ minWidth: '1000px' }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   disabled={!props.data.submitted}
          //   loading={confirmLoading}
          // >
          //   Print
          // </Button>,
          //     <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          //     Submit
          //   </Button>,
          <Space>{props.children}</Space>, //the buttons from the from
        ]}
      >
        <GenPrint>
          <InvoiceSlip data={props.data} />
        </GenPrint>
      </Modal>
    </>
  );
};

export default InvoiceModal;
