

//
// DEMO CODE
// NEED TO FIX EVERYTHING TO MATCH THE BOOKS TABLE
//


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

function close_db_async(db) {
    return new Promise((resolve, reject) => {
        db.close(err => {
            if (err) {
                console.log(err.message);
                reject(err.message)
            }
            else {
                console.log('Database connection closed!');
                resolve()
            }
        })
    })
}
function update_salary_by_id_async(db, id, new_salary) {
    return new Promise(function (resolve, reject) {
        const sql_update = `UPDATE COMPANY 
                        SET SALARY = ?
                        WHERE id = ?`
        db.run(sql_update, [new_salary, id], err => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(`Salary updated to ${new_salary}`);
                resolve(new_salary)
            }
        })
    })
}

function delete_book_by_id_async(db, id) {
    return new Promise(function (resolve, reject) {
        const sql_update = `DELETE FROM COMPANY 
                        WHERE id = ?`
        db.run(sql_update, [id], err => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(`Deleted record id ${id}`);
                resolve()
            }
        })
    })
}

function select_async(db, query) {
    return new Promise(function (resolve, reject) {
        db.all(query, function (err, rows) {
            if (err) { return reject(err); }
            resolve(rows);
        });
    });
}

function insert_book_async(db, data) {
    return new Promise(function (resolve, reject) {
        const sql_insert = `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
                            VALUES (?, ?, ? ,?, ?);` // [7, 'DAN', 18, 'MEXICO', 32000] == data
        db.run(sql_insert, data, err => {
            if (err) {
                reject(err)
            }
            else {
                console.log(`INSERTED ${data}`);
                resolve()
            }
        })
    });
}

async function main() {
    try {
        const db = await open_db(db_file_loc)
        console.log(db);
        await insert_company_async(db, [12, 'DAN12', 18, 'MEXICO', 32000])
        await update_salary_by_id_async(db, 8, (new Date()).getUTCMilliseconds() * 489)
        const result = await select_async(db, "SELECT * from company");
        console.log(result);
        await delete_company_by_id_async(db, 12)
        await close_db_async(db)
    }
    catch (err) {
        console.log(`ERROR: ${err}`);
    }
}

main()





