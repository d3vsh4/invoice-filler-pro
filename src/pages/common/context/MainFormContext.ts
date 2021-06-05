import { FormInstance } from '@ant-design/pro-form';
import { createContext } from 'react';

type MainFormContextTypes = {
  formRef?: FormInstance;
};
export const MainFormContext = createContext<MainFormContextTypes>({});
