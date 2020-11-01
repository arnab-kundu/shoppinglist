var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

/**
 * GET user list
 * TYPE GET
 * http://localhost:3000/api/users
 */
router.get('/users', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('users').find()
            .toArray(function (err, result) {
                if (err) throw err;
                for (i in result) {
                    delete result[i]._id;
                }
                res.send(result);
                //console.log(JSON.stringify(res));
                db.close();
            });

    });
});

module.exports = router;
