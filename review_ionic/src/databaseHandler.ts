import { openDB } from 'idb'

const DB_NAME = 'TCH1901Review'

export async function insertStudent(studentInfo:any) {
    const db = await openDB(DB_NAME,1)
    await db.put('students',studentInfo)
}

export async function getAllStudents() {
    const db = await openDB(DB_NAME,1)
    return await db.getAll("students")
}

initializedDB().then(()=>{
    console.log("Database initialized!")
})

async function initializedDB() {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            const store = db.createObjectStore('students', {
                keyPath: 'id',
                autoIncrement:true
            })
        }
    })
}