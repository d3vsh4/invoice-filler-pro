import { INITIAL_FORM_VALUES } from '@/models/InitialValues';
import { useCallback, useMemo, useState } from 'react';
import { MyFormData } from './types';

export default (): MyFormData => {
  const [formState, setFormState] = useState<FormStateTypes>({
    ...INITIAL_FORM_VALUES,
  });

  return { formState, setFormState };
};
