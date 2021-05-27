import { useState, useCallback } from 'react';
import PouchDB from "pouchdb";
const localDB = new PouchDB('counterDb');

export default () => {
    const [doc, setDoc] = useState<PouchDB.Core.AllDocsResponse<{}>>();

    const isEmpty = async () => {
        const info = await localDB.info();
        console.log(info);
        return new Promise((resolve) => resolve(info.doc_count));
    }

    const getLastID = async () => {
        const docs = await localDB.allDocs({ include_docs: true, descending: true });
        const id = docs[0]?._id;
        id ? id : "1"
        console.log(id);
        return new Promise((resolve) => resolve(id));
    }

    const addID = async () => {
        const info = await localDB.info();
        if (info.doc_count) {
            const docs = await localDB.allDocs({ include_docs: true, descending: true });
            const id = docs[0]._id;
            const add = await localDB.put({
                _id: (parseFloat(id) + 1).toString(),
            })
            console.log(add);
        }
        else {
            const add = await localDB.put({
                _id: '1',
            })
            console.log(add);
        }
    }

    return { isEmpty, getLastID, addID }
}