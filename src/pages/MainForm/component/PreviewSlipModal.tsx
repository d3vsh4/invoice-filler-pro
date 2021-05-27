import React from "react";
import { Button, Modal } from 'antd';
import { useState } from 'react';
import GenPrint from "@/components/common/GenPrint";
import InvoiceSlip from "./MainSlip";
import ButtonGroup from "antd/lib/button/button-group";

export default (props: { data: FormStateTypes }) => {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    return (
        <>
            <ButtonGroup>
                <Button type="primary" onClick={showModal}>
                    Preview
                </Button>
            </ButtonGroup>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button onClick={handleOk}>Ok</Button>
                ]}
                width={1124}
            >
                <GenPrint>
                    <InvoiceSlip data={props.data} />
                </GenPrint>
            </Modal>
        </>
    );
}