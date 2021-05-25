import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { useCallback, useMemo, useState } from 'react';
import { MyFormData } from './types';
type MyFormTemplateData = {
  formTemplates: Record<string, FormStateTypes>;
  setFormTemplates: React.Dispatch<React.SetStateAction<Record<string, FormStateTypes>>>;
};

export default (): MyFormTemplateData => {
  //   const [formState, setFormState] = useState<FormStateTypes>({
  //     ...INITIAL_FORM_VALUES,
  //   });
  const [formTemplates, setFormTemplates] = useState<Record<string, FormStateTypes>>({
    initial: INITIAL_FORM_VALUES,
  });
  return { formTemplates, setFormTemplates };
};
