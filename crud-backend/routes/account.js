let express = require('express');
const router = express.Router();
const mysql = require('mysql');
const uuid = require('uuid');


/**
 * Register new User.
 * TYPE POST
 * http://localhost:3000/api/account/register
 * application/json
 * { "username": "John Doe", "email": "johndoe@gmail.com", "password": "password" }
 * or
 * x-www-form-urlencoded
 * username:John Doe
 * email:johndoe@gmail.com
 * password:password
 */
router.post('/register', function (req, res, next) {

    console.log(req.body);


    var query = "Insert into `users` values('" + uuid.v1() + "', '" + req.body.username + "', '" + req.body.email + "', '" + req.body.password + "');";

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB connection error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log("REQUEST" + req.url);
                //console.log("RESPONSE" + result);
                res.send(result);
                connection.end();
            });
        }
    });
});


/**
 * Login user.
 * TYPE POST
 * http://localhost:3000/api/account/login
 *
 * x-www-form-urlencoded
 * email:johndoe@gmail.com
 * password:password
 */
router.post('/login', function (req, res, next) {

    var query = "SELECT * FROM `users` where email = '" + req.body.email + "' AND password = '" + req.body.password + "';";
    console.log(query);

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB connection error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err;
                //console.log("REQUEST" + req.url);
                //console.log("RESPONSE" + result);
                if (result.length >= 1)
                    res.send(result[0]);
                else {
                    //res.status(401) //TODO send 401
                    res.send({
                        "id": "-1",
                        "username": "noname",
                        "email": "na",
                        "password": ""
                    });
                }
                connection.end();
            });
        }
    });
});


/**
 * EDIT ITEM
 * TYPE PUT
 * http://localhost:3000/api/account/edit_user?id=1
 *
 * x-www-form-urlencoded
 * username:John Doe1
 * email:johndoe1@gmail.com
 * password:password1
 */
router.put('/edit_user', function (req, res, next) {

    console.log(req.body)


    var query =
        "UPDATE `users` SET `username` = '" + req.body.username +
        "', `email` = '" + req.body.email + "', password = '" + req.body.password + "'  where id = " + req.body.id + ";";

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB connection error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log("REQUEST" + req.url);
                //console.log("RESPONSE" + result);
                res.send(result);
                connection.end();
            });
        }
    });
});


/**
 * DELETE User
 * TYPE DELETE
 * http://localhost:3000/api/account?id=1
 */
router.delete('/', function (req, res, next) {

    console.log(req.query);


    var query = "Delete from `users` where id = '" + req.query.id + "';";

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB connection error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log("REQUEST" + req.url);
                //console.log("RESPONSE" + result);
                res.send(result);
                connection.end();
            });
        }
    });
});


module.exports = router;
