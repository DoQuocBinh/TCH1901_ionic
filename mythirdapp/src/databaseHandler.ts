import {openDB} from 'idb'

const database_name = 'TCH1901_DB'

initDB().then(()=>{
    console.log(database_name + " was created!")
})

export async function insertCustomer(customer:any) {
    const db = await openDB(database_name,1);
    await db.transaction("customers", 'readwrite').
                                objectStore("customers").put(customer);
}

async function initDB(){
    const db = await openDB(database_name,1,{
        upgrade(db){
            const store = db.createObjectStore('customers',{
                keyPath : 'id',
                autoIncrement : true
            })
        }
    })

}
