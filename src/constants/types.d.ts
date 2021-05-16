type FormStateTypes = {
  bf_name: string;
  bf_gstin: string;
  bf_street: string;
  bf_city: string;
  bf_state: string;
  bf_zip: number | string;
  bt_name: string;
  bt_gstin: string;
  bt_street: string;
  bt_city: string;
  bt_state: string;
  bt_zip: number | string;
  s_street: string;
  s_city: string;
  s_state: string;
  s_zip: number | string;
  rent_type: 'variable' | 'fixed' | string ;
  invoice_no:string;
    invoice_date:string;
  area: number;
  unit: 'sq. ft.'| string;
  pan: string;
  sac: number;
  p_head?: string;
  p_content?: string;
  p_note?: string;
  taxable_amount: number;
  per_rate: number;
  isSubmitting: boolean;
  submitted: boolean;
  isFormValid: boolean;
  taxed_amount: number;
  tax_amount: number;
  isIGST: boolean
};
type AddressProps = {
  prefix: string;
};
type DataProps = {
  data: FormStateTypes;
  setData?: any;
  form?: FormInstance<FormStateTypes>;
};