import { INITIAL_FORM_VALUES } from '@/models/InitialValues';
import { useCallback, useMemo, useState } from 'react';
import { useModel } from 'umi';

import PouchDB from 'pouchdb';
import { message } from 'antd';
let localDB = new PouchDB('tempDB');

type MyFormTemplateData = {
  getTemplated: () => Record<string, FormStateTypes>;
  putTemplates: (data: any) => void;
  formTemplates?: Record<string, FormStateTypes>;
  setFormTemplates?: React.Dispatch<React.SetStateAction<Record<string, FormStateTypes>>>;
  increment?: any;
};

export default (): MyFormTemplateData => {
  const { increment } = useModel('counter'); //used to renrender all connectred compinets
  const [formTemplates, setFormTemplates] = useState<Record<string, FormStateTypes>>({
    initial: INITIAL_FORM_VALUES,
  });

  async function deleteDb() {
    try {
      var response = await localDB.destroy();
      localDB = new PouchDB('localDatabase');
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  const addTemplate = async (data: FormStateTypes) => {
    const template = {
      _id: data.t_name,
      ...data,
    };

    await localDB.put(template);
    message.success('successfully added to database');
  };

  const showInvoices = async () => {
    const doc = await localDB.allDocs({ include_docs: true, descending: true });
    return doc;
  };

  const getTemplated = () => {
    return formTemplates;
  };
  const putTemplates = async (data: any) => {
    let templates = (await showInvoices()).rows;
    await addTemplate(data);
    setFormTemplates((pv) => ({
      ...pv,
      [data.t_name]: {
        ...data,
      },
    }));
  };
  return { formTemplates, getTemplated, putTemplates };
};
