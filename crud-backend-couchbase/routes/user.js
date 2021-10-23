var express = require('express');
var router = express.Router();
//var mysql = require('mysql');
const { log } = require('console')
var couchbase = require('couchbase')


/**
 * GET user list
 * TYPE GET
 * http://localhost:3000/api/users
 */
router.get('/users', function (req, response, next) {
/*
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
*/
    couchbase.connect(
        'couchbase://127.0.0.1',
        {
          username: 'Administrator',
          password: '123456',
        },
        (err, cluster) => {
          var bucket = cluster.bucket('test')
          var coll = bucket.defaultCollection()
      
          coll.upsert('testdoc2', { name: 'Frank Joe' }, (err, res) => {
            if (err) {
                console.error("upsert Error")
                //throw err
            }
            coll.get('testdoc2', (err, res) => {
              if (err){
                  console.error("get Error")
              } //throw err
      
              console.log("response",res)
              response.send(res.value);
            })
          })
        }
      )
      
});

module.exports = router;
