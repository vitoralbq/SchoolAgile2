const sqlite3 = require("sqlite3").verbose();

const filePath = "../db/dbConfig";

const createDbConnection = () => {
    let db = new sqlite3.Database(filePath, (error:any) => {
        if (error) {
            return console.error(error.message);
        }
        console.log("Connection with SQLite has been established");
    });

    db.run(`CREATE TABLE IF NOT EXISTS Participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        type VARCHAR(50)
    )`);

    return db;
};

module.exports = { createDbConnection };


export default createDbConnection