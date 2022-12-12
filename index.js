const sqlite3 = require('sqlite3').verbose();
const db_file_loc = './db/db1.db'

function open_db(file_name) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(file_name, (err) => {
            if (err) {
                console.log(`Failed to connect to ${file_name}`);
                reject(err)
            }
            else {
                console.log(`Successfully connected to ${file_name}`);
                resolve(db)
            }
        })
    })
}

function insert_company(db, data) {
    const sql_insert = `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
                        VALUES (?, ?, ? ,?, ?);` // [7, 'DAN', 18, 'MEXICO', 32000] == data
    db.run(sql_insert, data, err => {
        if (err) {
            console.log(`ERROR: ${err}`);
        }
        else {
            console.log(`INSERTED ${data}`);
        }
    })
}

function select(db, query) {
    db.serialize(async () => {
        console.log(query)
        await db.each(query, (err, row) => {
            if (err) {
                console.log(`ERROR: ${err}`);
            }
            else {
                console.log(row)
            }
        })
    })
}

function close_db(db) {
    db.close(err => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log('Database connection closed!');
        }
    })
}
function update_salary_by_id(db, id, new_salary) {
    const sql_update = `UPDATE COMPANY 
                        SET SALARY = ?
                        WHERE id = ?`
    db.run(sql_update, [new_salary, id], err => {
        if (err) {
            console.log(`ERROR: ${err}`);
        }
        else {
            console.log(`Salary updated to ${new_salary}`);
        }
    })
}

function delete_company_by_id(db, id) {
}

function db_all(db, query){
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

async function main() {
    const db = await open_db(db_file_loc)
    console.log(db);
    const result = await db_all(db, "SELECT * from company");
    console.log(result);
}
    //setTimeout(() => insert(db, [7, 'DAN', 18, 'MEXICO', 32000]), 100)
    //setTimeout(() => insert(db, [8, 'SUZI', 22, 'SAN PAULO', 47775]), 100)
    //setTimeout(() => insert(db, [9, 'TORRES2', 24, 'SPAIN', 89776]), 100)
    //setTimeout(() => insert(db, [10, 'TORRES3', 24, 'SPAIN', 89776]), 100)
    //setTimeout(() => insert(db, [11, 'TORRES4', 24, 'SPAIN', 89776]), 100)
//    select(db, `SELECT * FROM COMPANY`)
    //select(db, `SELECT * FROM COMPANY`)
    //setTimeout(() => console.log('============================================'), 800);
    //setTimeout(() => select(db, `SELECT * FROM COMPANY WHERE SALARY > 30000`), 1100)
    //setTimeout(() => update_salary_by_id(db, 1, 100100), 1400)
    //setTimeout(() => close_db(db), 1700);
}
main()

//-- INSERT
//-- UPDATE (db.run)
//-- DELETE (db.run)





