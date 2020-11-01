let express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";


/**
 * Add new product into recently_viewed.
 * TYPE GET
 * http://localhost:3000/api/recently_viewed/add_product?user_id=0d2ad590-fece-11ea-9959-ef927820ccec&product_id=2
 */
router.get('/add_product', function (req, response, next) {

    console.log(req.query.user_id);
    console.log(req.query.product_id);
    var dbquery = {};
    if (req.query.user_id !== undefined && req.query.product_id !== undefined) {
        dbquery = "{\"user_id\":\"" + req.query.user_id + "\", \"product_id\": " + req.query.product_id + "}".toString();
    } else {
        response.status(400);
        response.send({"msg": "Missing params"});
        return;
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('recently_viewed').insertOne(JSON.parse(dbquery), function (err, result) {
            if (err) throw err;
            response.send(result);
            db.close();
        });


    });
});


/**
 * GET recently_viewed products.
 * TYPE GET
 * http://localhost:3000/api/recently_viewed/get_products?user_id=0d2ad390-fece-11ea-9959-ef927820ccec
 */
router.get('/get_products', function (req, response, next) {

    console.log(req.query.user_id);
    var dbquery = {};
    if (req.query.user_id !== undefined) {
        dbquery = "{\"user_id\":\"" + req.query.user_id + "\"}".toString();
    } else {
        response.status(400);
        response.send({"msg": "missing params"});
        return;
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('recently_viewed').aggregate([
            {
                $lookup:
                    {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: 'id',
                        as: 'my_recently_viewed'
                    }

            },
            {$match: {user_id: req.query.user_id}}
        ]).limit(300).toArray(function (err, res) {
            if (err) throw err;
            for (i in res) {
                delete res[i]["_id"];
                delete res[i]["user_id"];
                delete res[i]["product_id"];
                res[i]= res[i]["my_recently_viewed"][0];
                delete res[i]["_id"];
            }
            response.send(res);
            db.close();
        });


    });
});

module.exports = router;