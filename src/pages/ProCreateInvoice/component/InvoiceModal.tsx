import { Button, Modal, Space } from 'antd';
import React from 'react';
import GenPrint from '@/components/common/GenPrint';
import ButtonGroup from 'antd/es/button/button-group';
import InvoiceSlip from './InvoiceSlip';
import { convertRupeeToWords } from '@/utils/utils';

// const printHelper: any = async () => {
//     // var content = document.getElementById("print-container")!;
//     var content = document.getElementsByTagName("html")[0]!;
//     var pri: any = document.getElementById("ifmcontentstoprint")!.contentWindow;
//     pri.document.open();
//     pri.document.write(content.innerHTML);
//     // ReactDOM.render(<AreaForm />, pri.document.getElementById('root'));
//     pri.document.close();
//     pri.focus();
//     setTimeout(() => pri.print(), 2000)
// }
type InvoiceModal = {
  setData: React.Dispatch<React.SetStateAction<FormStateTypes>>;
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
          isIGST: false,
          tax_amount: 0,
          taxed_amount: 0,
          amount_in_words: '',
        };

        if (props.data.bt_state == props.data.bf_state) {
          toChange.isIGST = true;
        }
        toChange.tax_amount = toChange.isIGST
          ? Math.ceil((props.data.taxable_amount * 18) / 100)
          : 2 * Math.ceil((props.data.taxable_amount * 9) / 100);
        toChange.taxed_amount = Math.ceil(props.data.taxable_amount) + toChange.tax_amount;
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
    if (await props.checkInputForm()) {
      if (await calculateData()) {
        setVisible(true);
      }
    }
  };

  const handleOk = () => {
    // printHelper();
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
        <p>
          <GenPrint>
            <InvoiceSlip data={props.data} />
          </GenPrint>
        </p>
      </Modal>
    </>
  );
};

export default InvoiceModal;
