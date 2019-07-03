var mysql = require('mysql');

//connection pool with all DB connection details
//must have an .env file in the root folder with each item as shown below
//for example: DB_HOST=MyHostIP
var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

//function to search the DB based on request body parameters
//first establishes a connection from the connection pool
//queries the DB, releases the connection, and sends the results via the provided res object
//needs more/better error handling
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

//function to read all records from the db 
//establishes a connectin from the connection pool
//queries the DB, releases the connection, and sends the results via the provided res object
//needs more/better error handling
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

//function to add a new entry to the db based on request body parameters
//establishes a connectin from the connection pool
//queries the DB, releases the connection, and sends the results via the provided res object
//needs more/better error handling
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

//function to delete an entry from the db based on a request body id
//establishes a connectin from the connection pool
//queries the DB, releases the connection, and sends the results via the provided res object
//needs more/better error handling
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

//function to update an entry in the db based on request body parameters
//establishes a connectin from the connection pool
//queries the DB, releases the connection, and sends the results via the provided res object
//needs more/better error handling
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