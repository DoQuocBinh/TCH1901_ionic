import {openDB} from 'idb'

const dbName = "TCH1901_PicDB"

initDB().then(()=>{
    console.log('Init Done!')
})

async function insertPicture(picInfo:any) {
    const db = await openDB(dbName, 1)
    await db.put('Pictures',picInfo)
    console.log("One pic inserted!")
}
async function  getPics() {
    const db = await openDB(dbName, 1)
    return db.getAll("Pictures")
}

async function initDB() {
    const db = await openDB(dbName, 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore('Pictures', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        },
    });
}