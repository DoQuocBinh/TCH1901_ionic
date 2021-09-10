import {openDB} from 'idb'
import { Customer } from './models';

const database_name = 'TCH1901_DB'

initDB().then(()=>{
    console.log(database_name + " was created!")
})

export async function deleteCustomer(id:number) {
    const db = await openDB(database_name,1)
    await db.delete("customers",id)
}

export async function updateCustomer(customer:Customer) {
    const db = await openDB(database_name,1)
    var productDB = await db.get("customers",customer.id!) as Customer
    productDB.name = customer.name
    productDB.country = customer.country
    productDB.gender= customer.gender
    productDB.languages = customer.languages
    productDB.dateOfBirth = customer.dateOfBirth

    await db.put("customers",productDB);
}

export async function getCustomerById(id:number) {
    const db = await openDB(database_name,1);
    return await db.get("customers",id)
}

export async function getAllCustomers() {
    const db = await openDB(database_name,1);
    return await db.transaction("customers").objectStore("customers").getAll();
}

export async function insertCustomer(customer:Customer) {
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
