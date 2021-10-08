import { openDB } from 'idb'

const DB_NAME = 'TCH1901_Pics'

export async function insertPicture(picInfo:any){
    const db = await openDB(DB_NAME,1)
    await db.put("pictures",picInfo)
    console.log("inserted 1 row!")
}

export async function getAllPics() {
    const db = await openDB(DB_NAME,1)
    return await db.getAll("pictures")
}

initDB().then(()=>{
    console.log("Database initilizied!")
})

async function initDB() {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            const store = db.createObjectStore('pictures', {
                keyPath: 'id',
                autoIncrement: true,
            });
        }
    })
}

