import { getFiscalYear } from '@/utils/utils';
import PouchDB from 'pouchdb';
import { useState } from 'react';
import { message } from 'antd';
let localDB = new PouchDB('localDatabase');

// const getInfo = () => remoteDB.info().then(function (info) {
//     console.log(info);
//   })

export default () => {
  const [syncing, setSync] = useState(false);

  const getLastId = async () => {
    const doc = await localDB.allDocs({ include_docs: true, descending: true });
    if (doc.total_rows <= 0) return undefined;
    const id = doc.rows[0].id;
    return id;
  };
  async function deleteDb() {
    try {
      var response = await localDB.destroy();
      localDB = new PouchDB('localDatabase');
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  const addInvoice = async (data: FormStateTypes) => {
    const newid = data.invoice_no ? data.invoice_no : '00-00/0000';
    const invoice = {
      _id: newid,
      ...data,
    };

    await localDB.put(invoice);
    message.success('successfully added to database');
  };

  const showInvoices = async () => {
    const doc = await localDB.allDocs({ include_docs: true, descending: true });
    return doc;
  };
  // async function sync() {
  //   setSync(true);
  //   var opts = { live: true };
  //   await localDB.replicate.to(remoteDB, opts, (e) => console.log(e));
  //   await localDB.replicate.from(remoteDB, opts, (e) => console.log(e));
  //   setSync(false);
  // }
  return {
    addInvoice,
    showInvoices,
    getLastId,
    deleteDb,
    // sync,
  };
};
