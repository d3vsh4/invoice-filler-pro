import { FormInstance } from 'antd/es/form/Form';
import { createContext } from 'react';

type FormHelpersType = { isFormSubmitting: boolean };

type FormStateHook = {
  formState: FormStateTypes;
  setFormState: React.Dispatch<React.SetStateAction<FormStateTypes>>;
};
type FormHelpers = {
  formHelpers: FormHelpersType;
  setFormHelpers: React.Dispatch<React.SetStateAction<FormHelpersType>>;
};
type CreateFormContextTypes = {
  formRef?: FormInstance;
  formStateHook?: FormStateHook;
  forHelpersHook?: FormHelpers;
};

export const CreateFormContext = createContext<CreateFormContextTypes>({});
