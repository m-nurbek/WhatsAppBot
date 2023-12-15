const db = require('./database.js');

class CRUD {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        let result = {};
        this.db.all("SELECT * FROM user", [], (err, rows) => {
            if (err) {
                console.error("Error retrieving data:", err)
            } else {
                rows.forEach((row) => {
                    console.log(`ID: ${row.id}, Name: ${row.name}, Phone: ${row.phone_number}, Action: ${row.action}, Date: ${row.date}, Time: ${row.time}`);
                });
                result = rows;
            }
        });
        return result;
    }

    getByPhone(phone_number) {
        let sql = `SELECT * FROM user WHERE phone_number = ?`;
        let result;
        this.db.get(sql, [phone_number], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                console.log(`Phone number ${phone_number} exists in the database.`);
                result = row;
            } else {
                console.log(`Phone number ${phone_number} does not exist in the database.`);
                result = null;
            }
        });
        return result;
    }

    update(date, time, name, phone_number, action) {
        this.db.run(
            "UPDATE user SET date = ?, time = ?, name = ?, phone_number = ?, action = ?  WHERE phone_number = ?",
            [date, time, name, phone_number, action, phone_number],
            function (err) {
                if (err) {
                    console.error("Error updating data:", err);
                } else {
                    console.log(`Record updated`);
                }
            }
        );
    }

    add(date, time, name, phone_number, action) {
        let insert = 'INSERT INTO user (date, time, name, phone_number, action) VALUES (?,?,?,?,?)';
        this.db.run(insert, [date, time, name, phone_number, action]);
    }

    delete(phone_number) {
        db.run("DELETE FROM user WHERE phone_number = ?", [phone_number], function (err) {
            if (err) {
                console.error("Error deleting data:", err);
            } else {
                console.log(`Record deleted`);
            }
        });
    }
}

crud = new CRUD(db);
module.exports = crud;
