const sqlite3 = require('sqlite3').verbose();
const settings = require('../../../settings');

function DB() {
    const dbName = settings.dbName;
    let db;

    this.getUserText = hash => {
        return new Promise(resolve => {
            db.serialize(() => {
                const query = 'SELECT user_id, "order", text FROM task WHERE hash=?';
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

    function getUserTasks(id) {
        return new Promise(resolve => {
            db.serialize(() => {
                const query = 'SELECT text, "order", hash FROM task WHERE user_id=?';
                db.all(query, [id], (err, rows) => resolve(err ? null : rows));
            });
        })
    }

    this.getUsersInfo = () => {
        return new Promise(resolve => {
            db.serialize(() => {
                const query = 'SELECT id, name, progress FROM user';
                db.all(query, [], (err, rows) => {
                    if (rows && rows.length) {
                        const result = rows.map(async (user) => ({
                            ...user,
                            tasks: await getUserTasks(user.id),
                        }));
                        Promise.all(result).then(value => resolve(value))
                    } else {
                        resolve(null)
                    }
                });
            });
        });
    };

    this.updateUserProgress = (userId, newProgress) => {
        db.serialize(() => {
            const query = 'UPDATE user SET progress=? WHERE id=?';
            db.run(query, [newProgress, userId]);
        });
    };

    (() => db = new sqlite3.Database(`${__dirname}/${dbName}`))();
}

module.exports = DB;
