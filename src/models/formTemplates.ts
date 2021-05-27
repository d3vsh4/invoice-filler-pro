import { INITIAL_FORM_VALUES } from '@/constants/InitialValues';
import { useCallback, useMemo, useState } from 'react';
import { useModel } from 'umi';
type MyFormTemplateData = {
  formTemplates: Record<string, FormStateTypes>;
  setFormTemplates: React.Dispatch<React.SetStateAction<Record<string, FormStateTypes>>>;
  increment?: any;
};

export default (): MyFormTemplateData => {
  const { increment } = useModel('counter'); //used to renrender all connectred compinets
  const [formTemplates, setFormTemplates] = useState<Record<string, FormStateTypes>>({
    initial: INITIAL_FORM_VALUES,
  });
  return { formTemplates, setFormTemplates };
};
