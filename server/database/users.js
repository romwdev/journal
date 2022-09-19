const db = require("./db");

module.exports = {
  allUsers: (callback) => {
    db.query("SELECT * FROM users", (err, data) => callback(err, data));
  },
  getUsers: (username, password, callback) => {
    const queryString = `SELECT * FROM users WHERE username = "${username}" AND password = "${password}";`;

    db.query(queryString, (err, data) => {
      callback(err, data);
    });
  },

  createUser: (user, username, password, callback) => {
    const queryString = `INSERT INTO users (firstName, lastName, email, username, password) VALUES ("${user.firstName}", "${user.lastName}", "${user.email}", "${username}", "${password}");`;

    db.query(queryString, (err, data) => {
      callback(err, data);
    });
  },
};
