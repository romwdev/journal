const express = require("express");
const app = express();
const db = require("./database/db");
const users = require("./database/users");
const entries = require("./database/entries");

app.use(express.static("dist"));
app.use(express.json());

app.get("/allUsers", (req, res) => {
  users.allUsers((err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.json(data);
    }
  });
});
app.get("/users", (req, res) => {
  let basicAuth = Buffer.from(
    req.headers.authorization.split(" ")[1],
    "base64"
  ).toString();
  let username = basicAuth.split(":")[0];
  let password = basicAuth.split(":")[1];
  users.getUsers(username, password, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(data);
    }
  });
});

app.get('/allEntries', (req, res) => {
    entries.allEntries((err, data) => {
        if (err) {
            res.sendStatus(400);
        } else res.send(data);
    })
});
// app.get('/entries', (req, res) => {
//   console.log('req.query: ', req.query);
//   entries.getEntries(req.query, (err, data) => {
//     if (err) {
//       res.sendStatus(400);
//     } else res.send(data);
//   })
// })
app.post("/users", (req, res) => {
  let basicAuth = Buffer.from(
    req.headers.authorization.split(" ")[1],
    "base64"
  ).toString();
  let username = basicAuth.split(":")[0];
  let password = basicAuth.split(":")[1];

  users.createUser(req.body, username, password, (err, data) => {
    if (err && err.errno === 1062) {
      res.send(err);
    } else if (err) {
      res.sendStatus(400);
    } else res.sendStatus(201);
  });
});

app.post('/entries', (req, res) => {
    entries.createEntry(req.body, (err, data) => {
        if (err) {
            res.sendStatus(400);
        } else res.sendStatus(201);
    })
})

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    console.error(new Error(err));
  }
  console.log(`Listening on port ${port}`);
});
