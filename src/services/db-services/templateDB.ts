import PouchDB from 'pouchdb';
import { message } from 'antd';
export let tempDB = new PouchDB('TemplateDb');

// const getInfo = () => remoteDB.info().then(function (info) {
//     console.log(info);
//   })
export const showTemplates = async () => {
  const doc = await tempDB.allDocs({ include_docs: true, descending: true });
  return doc;
};

export async function deleteDb() {
  try {
    var response = await tempDB.destroy();
    tempDB = new PouchDB('TemplateDb');
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
export const addTemplate = async (data: Record<string, any>) => {
  const Template = {
    _id: data.t_name,
    ...data,
    // invoice_date: data.invoice_date.toString(),
  };

  try {
    await tempDB.put(Template);
    message.success('template added');
  } catch (err) {
    console.log(err);
  }
};
export const updateTemplate = async (data: Record<string, any>) => {
  try {
    var doc = await tempDB.get(data.t_name);
    var response = await tempDB.put({
      _id: data.t_name,
      _rev: doc._rev,
      ...data,
    });
    message.success('template updated');
  } catch (err) {
    message.error('Template name changed');
    console.log(err.message);
  }
};
// async function sync() {
//   setSync(true);
//   var opts = { live: true };
//   await tempDB.replicate.to(remoteDB, opts, (e) => console.log(e));
//   await tempDB.replicate.from(remoteDB, opts, (e) => console.log(e));
//   setSync(false);
// }
