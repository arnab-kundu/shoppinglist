var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/**
 * GET user list
 * TYPE GET
 * http://localhost:3000/api/users
 */
router.get('/users', function (req, res, next) {

    var query = "SELECT * FROM `users`";

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
                res.send(result);
            });
        }
    });
});

module.exports = router;
