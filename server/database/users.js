const db = require("./db");

module.exports = {
  allUsers: (callback) => {
    db.query("SELECT * FROM users", (err, data) => callback(err, data));
  },
  getUsers: (username, password, callback) => {
    const queryString = `SELECT users.firstName, users.lastName, users.email, users.username, (SELECT JSON_ARRAYAGG(JSON_OBJECT("title", title, "body", body, "createdAt", createdAt)) from entries WHERE users.id = userId) AS "entries" FROM users WHERE username = "${username}" AND password = "${password}";`;
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
