import React from 'react';
import { createInvoice } from '@/services/invoice-services/api';
import { Card, Col, message, Row, Form, Input, Select, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

type AddressProps = {
    prefix: string;
};
const CompanyForm: React.FC<AddressProps> = ({ prefix }) => (
    <>
        <Row gutter={12}>
            <Col span={12}>
                <Form.Item label="Company Name">
                    <Input
                        name={prefix + "_name"}
                        //   width="md"
                        placeholder="Please enter the name"
                        disabled={prefix == "bf" ? true : undefined}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label="GSTIN">
                    <Input
                        width="md"
                        name={prefix + "_gstin"}
                        placeholder="Please enter the GSTIN no."
                        disabled={prefix == "bf" ? true : undefined}
                    />
                </Form.Item>
            </Col>
        </Row>
        <AdressForm prefix={prefix} />
    </>
);
const AdressForm: React.FC<AddressProps> = ({ prefix }) => (
    <>
        <Form.Item label="Street Address"><Input name={prefix + '_street'} width="xl" placeholder="Please enter the Street address" disabled={prefix == "bf" ? true : undefined} /></Form.Item>
        <Row gutter={12}>
            <Col span={8}><Form.Item label="City"><Input name={prefix + '_city'} placeholder="Please enter the city" disabled={prefix == "bf" ? true : undefined} /></Form.Item></Col>
            <Col span={8}><Form.Item label="State"><Input name={prefix + '_state'} placeholder="enter state" disabled={prefix == "bf" ? true : undefined} /></Form.Item></Col>
            <Col span={8}><Form.Item label="Postal/Zip Code"><Input name={prefix + '_zip'} placeholder="enter postal/zip" disabled={prefix == "bf" ? true : undefined} /></Form.Item></Col>
        </Row>
    </>
);
const AreaForm: React.FC = () => (
    <>
        <Row gutter={12}>
            {/* <Col span={6}><Form.Item label="Length"><Input name={'length'} placeholder="enter length" /></Form.Item></Col> */}
            {/* <Col span={6}><Form.Item label="Breadth"><Input name={'breadth'} placeholder="enter breadth" /></Form.Item></Col> */}
            <Col span={7}><Form.Item label="Area"><Input name='area' placeholder="enter total area" /></Form.Item></Col>
            <Col span={5}><Form.Item label="Unit"><Select defaultValue="sqft">
                <Select.Option value="sqft">SQ. FT.</Select.Option>
            </Select></Form.Item></Col>
        </Row>
    </>
);
const RateForm: React.FC = () => (
    <>
        <Row gutter={12}>
            <Col span={6}><Form.Item label="Rate per Unit"><Input name='per_rate' placeholder="enter per unit" /></Form.Item></Col>
            <Col span={6}><Form.Item label="Taxable Amount"><Input name="c_amount" placeholder="taxable amount" /></Form.Item></Col>
            <Col span={6}><Form.Item label="Total Payble Amount "><Input name="t_amount" placeholder="total amount" disabled bordered={false} /></Form.Item></Col>
        </Row>
    </>
);
// interface FieldData {
//     name: string | number | (string | number)[];
//     value?: any;
//     touched?: boolean;
//     validating?: boolean;
//     errors?: string[];
// }

export default () => {
    // const [fields, setFields] = useState<FieldData[]>([{ name: ['username'] }]);
    // // const [state, updateState] = React.useReducer(enhancedReducer, initialState);
    // const [bf_addr, setBFAddr] = useState<INVOICES.Bill>({ name: "NATHMAL SHARMA", address: { street_address: "Pamohi Road, Maghawa Para", city: "Gorchuk", state: "Guwahati", country: "India", zip: 781035 }, gstin: "18AIKPS1729A6Z6" })
    // const [bt_addr, setBTAddr] = useState<INVOICES.Bill>({ name: "", address: { street_address: "", city: "", state: "", country: "", zip: 0 }, gstin: "" })
    // const [area, setArea] = useState<INVOICES.Area>({ unit: "", size: 0 })
    return (
        <PageContainer>
            <Form
                requiredMark={true}
                layout="vertical"
                // fields={fields}
                // onFieldsChange={(_, allFields) => {
                //     // onChange(allFields);
                //     console.log("allFields");
                // }}
                onValuesChange={(changeValues) => console.log(changeValues)}
                // const handleAdd = async (fields: API.RuleListItem) => {
                //   const hide = message.loading('正在添加');
                //   try {
                //     await addRule({ ...fields });
                //     hide();
                //     message.success('添加成功');
                //     return true;
                //   } catch (error) {
                //     hide();
                //     message.error('添加失败请重试！');
                //     return false;
                //   }
                // };
                onFinish={async (values: INVOICES.Invoice) => {
                    await waitTime(2000);
                    await createInvoice({ ...values });
                    console.log(values);
                    message.success('Submitted successfully');
                }}

            // initialValues={{
            //     bf_name: bf_addr.name,
            //     bf_gstin: bf_addr.gstin,
            //     bf_street: bf_addr.address.street_address,
            //     bf_city: bf_addr.address.city,
            //     bf_state: bf_addr.address.state,
            //     bf_zip: bf_addr.address.zip,
            //     pan: "AIKPS1729A",
            //     sac: 997212,
            //     unit: "SQ. FT.",
            //     area: area.unit,
            // }}
            >
                <Card title="Billing From">
                    <CompanyForm prefix="bf" />
                </Card>
                <Card title="Billing To">
                    <CompanyForm prefix="bt" />
                </Card>
                <Card title="Supply Info">
                    <AdressForm prefix="s" />
                </Card>
                <Card title="Area Info">
                    <AreaForm />
                </Card>
                <Card title="Rate Info">
                    <RateForm />
                </Card>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </PageContainer>
    );
};
