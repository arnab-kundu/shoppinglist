var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/users', function(req, res, next) {

    console.log(req.query)


    var query = "SELECT * FROM `user`"

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "xemplar_drive"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB conncetion error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err
                console.log("REQUEST" + req.url);
                res.send(result);
            });
        }
    });
});

module.exports = router;
