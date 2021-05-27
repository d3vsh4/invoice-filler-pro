import { FormInstance } from '@ant-design/pro-form';
import { createContext } from 'react';

type InvoiceFormContextTypes = {
  formRef?: FormInstance;
};
export const InvoiceFormContext = createContext<InvoiceFormContextTypes>({});
