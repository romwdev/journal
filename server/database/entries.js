// INSERT INTO journals (body, createdAt, userId) SELECT "Test Body", "2011-12-18 13:17:17", id FROM users WHERE username = "rvtaylor94"
const db = require('./db');

module.exports = {
    allEntries: (callback) => {
        const queryString = 'SELECT * FROM entries;';

        db.query(queryString, (err, results) => {
            callback(err, results);
        })
    },
    createEntry: (entry, callback) => {
        const queryString = `INSERT INTO entries (title, body, createdAt, userId) SELECT "${entry.title}", "${entry.body}", "${entry.timestamp}", id FROM users WHERE username = "${entry.currentUser}";`;

        db.query(queryString, (err, results) => {
            callback(err, results);
        })
    }
}