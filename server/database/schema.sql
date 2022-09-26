DROP DATABASE journal;
CREATE DATABASE journal;

USE journal;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  email VARCHAR(30) UNIQUE,
  username VARCHAR(20) UNIQUE,
  password VARCHAR(20)
);

CREATE TABLE entries (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  title VARCHAR(30),
  body TEXT,
  createdAt DATETIME,
  FOREIGN KEY (userId)
    REFERENCES users(id)
)

-- mysql -u root < server/database/schema.sql