import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { useCallback, useMemo, useState } from 'react';
export type MyFormInvoiceData = {
  formInvoices: Record<string, FormStateTypes>;
  setFormInvoices: React.Dispatch<React.SetStateAction<Record<string, FormStateTypes>>>;
};

export default (): MyFormInvoiceData => {
  //   const [formState, setFormState] = useState<FormStateTypes>({
  //     ...INITIAL_FORM_VALUES,
  //   });
  const [formInvoices, setFormInvoices] = useState<Record<string, FormStateTypes>>({
    initial: INITIAL_FORM_VALUES,
  });
  return { formInvoices, setFormInvoices };
};
