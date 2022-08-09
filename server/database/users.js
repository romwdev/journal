const db = require('./db');

module.exports = {
    getUsers: (user, callback) => {
        const queryString = `SELECT * FROM users WHERE username="${user.username}" AND password="${user.password}";`;

        db.query(queryString, (err, data) => {
            callback(err, data);
        })
    },

    createUser: (user, callback) => {
        const queryString = `INSERT INTO users (username, password) VALUES ("${user.username}", "${user.password}");`

        db.query(queryString, (err) => {
            console.log(err);
            callback(err);
        })
    }
}