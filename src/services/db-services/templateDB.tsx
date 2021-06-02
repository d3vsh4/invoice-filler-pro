import PouchDB from 'pouchdb';
import { message } from 'antd';
let localDB = new PouchDB('tempDB');

export const showTemplates = async () => {
    const doc = await localDB.allDocs({ include_docs: true, descending: true });
    return doc;
};
export async function deleteDb() {
    try {
        var response = await localDB.destroy();
        localDB = new PouchDB('tempDB');
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}
export const getLastId = async () => {
    const doc = await localDB.allDocs({ include_docs: true, descending: true });
    if (doc.total_rows <= 0) return undefined;
    const id = doc.rows[0].id;
    return id;
};
export const addTemplate = async (data: FormStateTypes) => {
    const Template = {
        _id: data.t_name,
        ...data,
    };

    await localDB.put(Template);
    message.success('Template successfully added to database');
};
// export async function sync() {
//       var opts = { live: true };
//       await localDB.replicate.to(remoteDB, opts, (e) => console.log(e));
//       await localDB.replicate.from(remoteDB, opts, (e) => console.log(e));
//     }

