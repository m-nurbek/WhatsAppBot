let sqlite3 = require('sqlite3').verbose();


const DB_SOURCE = "db.sqlite";

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            time TEXT,
            name TEXT, 
            phone_number TEXT UNIQUE,
            action TEXT,
            CONSTRAINT phone_number_unique UNIQUE (phone_number)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                }else{
                    // Table just created, creating some rows
                    let datetime = new Date();
                    let date = datetime.toLocaleDateString();
                    let time = datetime.toLocaleTimeString();
                    let insert = 'INSERT INTO user (date, time, name, phone_number, action) VALUES (?,?,?,?,?)';
                    db.run(insert, [date, time, 'admin', '7XXXXXXXXXX', 'NO ACTION'],
                        (err) => {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log(`A row has been inserted with row id: ${this.lastID}`);
                        });
                }
        });

    }
});


module.exports = db;