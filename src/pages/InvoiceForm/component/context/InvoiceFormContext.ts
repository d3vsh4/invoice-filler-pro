import { FormInstance } from 'antd/es/form/Form';
import { createContext } from 'react';

type InvoiceFormContextTypes = {
  formRef?: FormInstance;
};
export const InvoiceFormContext = createContext<InvoiceFormContextTypes>({});
