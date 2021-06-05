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
  rent_type: 'variable' | 'fixed' | string;
  invoice_no?: string;
  invoice_date: string | any;
  area: number;
  unit: 'sq. ft.' | string;
  pan: string;
  sac: number;
  p_head: string;
  p_content: string;
  p_note?: string;
  per_rate: number;
  taxable_amount: number;
  taxed_amount: number;
  tax_amount: number;
  isSameState: boolean;
  amount_in_words: string;
  t_name: string;
};

type HelperStateType = {};
type AddressProps = {
  prefix: string;
};
type DataProps = {
  form?: FormInstance<FormStateTypes>;
  data?: FormStateTypes;
  prefix: string;
  disabled?: boolean;
  readonly?: boolean;
};
