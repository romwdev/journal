const mysql = require('mysql2');

const db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'journal',
});
db.connect((err) => {
  if (err) {
    console.log('Error establishing connection.');

  } else {
    console.log('Connection to database established successfully!');
  }
});

module.exports = db;