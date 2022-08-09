const express = require('express');
const app = express();
const db = require('./database/db');
const users = require('./database/users');

app.use(express.static('dist'));
app.use(express.json());

app.get('/users', (req, res) => {
    users.getUsers(req.query, (err, data) => {
        if (err) {
            res.sendStatus(400);
        } else res.send(data);
    });
});

app.post('/users', (req, res) => {
    users.createUser(req.body, (err) => {
        if (err) {
            res.sendStatus(400);
        } else res.sendStatus(201);
    })
});

const port = 3000;

app.listen(port, (err) => {
    if (err) {
        console.error(new Error(err));
    }
    console.log(`Listening on port ${port}`);
})