import { Button, Modal, Space } from 'antd';
import React from 'react';
import GenPrint from '@/components/common/GenPrint';
import ButtonGroup from 'antd/es/button/button-group';
import InvoiceSlip from '@/pages/components/InvoiceSlip';
import { convertRupeeToWords } from '@/utils/utils';
import { useContext } from 'react';
import { CreateFormContext } from '../context/CreateFormContext';

type InvoiceModal = {
  children: Element[] | React.ReactNode;
};
const InvoiceModal: React.FC<InvoiceModal> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { formRef, formStateHook } = useContext(CreateFormContext);
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
        };

        if (formStateHook?.formState.bt_state == formStateHook?.formState.bf_state) {
          toChange.isSameState = true;
        }
        toChange.taxable_amount = Math.round(formStateHook?.formState.taxable_amount!);
        toChange.tax_amount = Math.round((toChange.taxable_amount * 18) / 100);
        toChange.taxed_amount = toChange.taxable_amount + toChange.tax_amount;
        toChange.amount_in_words = convertRupeeToWords(`${toChange.taxed_amount}`);
        formStateHook?.setFormState((prevData) => ({
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
    if (
      await formRef
        ?.validateFields()
        .then((v) => true)
        .catch((_) => false)
    ) {
      formStateHook?.setFormState((prevState) => ({
        ...prevState,
        ...formRef?.getFieldsValue(),
        invoice_date: formRef?.getFieldValue('invoice_date').format('DD/MM/YYYY'),
      }));
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
        title="Tax Invoice"
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
          <InvoiceSlip data={formStateHook?.formState!} />
        </GenPrint>
      </Modal>
    </>
  );
};

export default InvoiceModal;
