export type MyFormData = {
  formState: FormStateTypes;
  setFormState: React.Dispatch<React.SetStateAction<FormStateTypes>>;
};
export type MyFormDBData = {
  doc: FormStateTypes;
  id: string;
  key: string;
};
