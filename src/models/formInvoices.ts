import { INITIAL_FORM_VALUES } from '@/models/InitialValues';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { message } from 'antd';
import { useModel } from 'umi';
import { MyFormDBData } from './types';

export type MyFormInvoiceData = {
  getInvoiceFormData: () => MyFormDBData[];
  putFormInvoiceData: (data: any, key: string) => void;
};

const invoices: MyFormDBData[] = [];

export default (): MyFormInvoiceData => {
  //   const [formState, setFormState] = useState<FormStateTypes>({
  //     ...INITIAL_FORM_VALUES,
  //   });
  const [formInvoices, setFormInvoices] = useState<MyFormDBData[]>([
    {
      doc: INITIAL_FORM_VALUES,
      id: '00-00/0000',
      key: '00-00/0000',
    },
  ]);
  // const [invoices, setInvoices] = useState();
  const { addInvoice, showInvoices, getLastId, deleteDb } = useModel('mainDB');

  const putFormInvoiceData = async (data: any, key: string) => {
    let invoices = (await showInvoices()).rows;
    await addInvoice({
      ...data.doc,
    });
    // console.log('in add invoice: ', invoices);
    setFormInvoices((pv) => [data, ...invoices]);

    message.success('invoice added');
    return { ok: 'ok' };
  };
  const getInvoiceFormData = () => {
    return formInvoices;
  };
  return { getInvoiceFormData, putFormInvoiceData };
};
