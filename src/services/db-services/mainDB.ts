import PouchDB from 'pouchdb';
import { message } from 'antd';
let localDB = new PouchDB('localDatabase');

// const getInfo = () => remoteDB.info().then(function (info) {
//     console.log(info);
//   })
export const showInvoices = async () => {
  const doc = await localDB.allDocs({ include_docs: true, descending: true });
  return doc;
};

export const getLastId = async () => {
  const doc = await localDB.allDocs({ include_docs: true, descending: true });
  if (doc.total_rows <= 0) return undefined;
  const id = doc.rows[0].id;
  return id;
};
export async function deleteDb() {
  try {
    var response = await localDB.destroy();
    localDB = new PouchDB('localDatabase', { revs_limit: 1, auto_compaction: true });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
export const addInvoice = async (data: FormStateTypes) => {
  const newid = data.invoice_no ? data.invoice_no : '00-00/0000';
  const invoice = {
    _id: newid,
    ...data,
  };

  await localDB.put(invoice);
  message.success('successfully added');
};
export const deleteInvoice = async (data: Record<string, any>) => {
  try {
    var doc = await localDB.get(data.invoice_no);
    var response = await localDB.remove(doc);
    message.success('Invoice Deleted');
  } catch (err) {
    message.error('delete unsuccessful');
    console.log(err.message);
  }
};
// async function sync() {
//   setSync(true);
//   var opts = { live: true };
//   await localDB.replicate.to(remoteDB, opts, (e) => console.log(e));
//   await localDB.replicate.from(remoteDB, opts, (e) => console.log(e));
//   setSync(false);
// }
