import PouchDB from 'pouchdb';
import { useState } from 'react';
const localDB = new PouchDB('localDatabase');

// const getInfo = () => remoteDB.info().then(function (info) {
//     console.log(info);
//   })

export default () => {
  const [syncing, setSync] = useState(false);
  const [doc, setDoc] = useState<PouchDB.Core.AllDocsResponse<{}>>();

  const addInvoice = async () => {
    const invoice = {
      _id: new Date().toISOString(),
      data: 'data',
    };
    await localDB.put(invoice);
    alert('successfully added');
  };
  const showInvoices = async () => {
    const doc = await localDB.allDocs({ include_docs: true, descending: true });
    setDoc(doc);
    return doc;
  };
  return {
    addInvoice,
    showInvoices,
  };
};
