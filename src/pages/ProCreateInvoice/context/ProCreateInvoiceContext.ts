import { FormInstance } from 'antd/es/form/Form';
import { createContext } from 'react';

type ProCreateInvoiceContextTypes = {
  formRef?: FormInstance;
};
export const ProCreateInvoiceContext = createContext<ProCreateInvoiceContextTypes>({});
