var express = require('express');
var app = express();
var cors = require("cors");
var mysql = require('mysql');
var bodyPasrser = require('body-parser');

app.use(cors());
app.use(bodyPasrser.json());

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

exports.search = (req, res) => {
    pool.getConnection((err, con) => {
        if (err) throw err;
        console.log("searching data")
        con.query("select * from roster where " + req.body.category + " = ?", [req.body.equals], (err, result, fields) => {
            con.release();
            if (err) throw err;
            res.send(result);
        })
    })
}

exports.readAll = (res) => {
    pool.getConnection((err, con) => {
        if (err) throw err;
        console.log("connected to db");
        con.query("select * from roster", (err, result, fields) => {
            con.release();
            if (err) throw err;
            res.send(result);
        });
    });
}

exports.create = (req, res) => {
    pool.getConnection((err, con) => {
        if (err) throw err;
        console.log("connected to db");
        con.query("insert into roster (firstName, lastName, age, grade) values (?, ?, ?, ?)", [req.body.fname, req.body.lname, req.body.age, req.body.grade], (err, result, fields) => {
            con.release();
            if (err) throw err;
            res.redirect('/read');
        });
    });
}

exports.delete = (req, res) => {
    pool.getConnection((err, con) => {
        if (err) throw err;
        console.log("connected to db");
        con.query("delete from roster where ID = ?", [req.body.id], (err, result, fields) => {
            if (err) throw err;
        });
        con.query("select * from roster", (err, result, fields) => {
            con.release();
            if (err) throw err;
            res.send(result);
        });
    });
}

exports.update = (req, res) => {
    pool.getConnection((err, con) => {
        if (err) throw err;
        console.log("connected to db");
        con.query("update roster set " + req.body.category +" = ? where ID = ?", [req.body.value, req.body.id], (err, result, fields) => {
            if (err) throw err;
        });
        con.query("select * from roster", (err, result, fields) => {
            con.release();
            if (err) throw err;
            res.send(result);
        });
    });
}