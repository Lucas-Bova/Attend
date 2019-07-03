var express = require('express');
var app = express();
var port = 8080;
var cors = require("cors");
var bodyPasrser = require('body-parser');
require('dotenv').config();

var dbcalls = require('./dbcalls')

app.use(cors());
app.use(bodyPasrser.json());

app.get('/read', (req, res) => {
    dbcalls.readAll(res);
});

app.post('/create', (req, res) => {
    dbcalls.create(req, res)
});

app.delete('/delete', (req, res) => {
    dbcalls.delete(req, res);
});

app.put('/update', (req, res) => {
    dbcalls.update(req, res);
});

app.post('/search', (req, res) => {
    console.log("reached search endpoint")
    dbcalls.search(req, res);
})

app.listen(port, () => console.log('server listening on port ' + port)
);