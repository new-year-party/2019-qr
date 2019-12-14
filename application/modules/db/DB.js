const sqlite3 = require('sqlite3').verbose();
const settings = require('../../../settings');

function DB() {
    const dbName = settings.dbName;
    let db;

    this.getUserText = hash => {
        return new Promise(resolve => {
            db.serialize(() => {
                const query = "SELECT user_id, order, text FROM task WHERE hash=?";
                db.get(query, [hash], (err, row) => resolve(err ? null : row));
            });
        });
    };

    this.getUserByUserId = userId => {
        return new Promise(resolve => {
            db.serialize(() => {
                const query = "SELECT name, progress FROM user WHERE id=?";
                db.get(query, [userId], (err, row) => resolve(err ? null : row));
            });
        });
    };

    this.getUsersInfo = () => {
        return new Promise(resolve => {
            db.serialize(() => {
                const query = "SELECT name, progress, text, 'order', hash FROM user JOIN task ON (task.user_id = user.id)";
                db.all(query, [], (err, rows) => resolve(err ? null : rows));
            });
        });
    };

    (() => db = new sqlite3.Database(`${__dirname}/${dbName}`))();
}

module.exports = DB;
