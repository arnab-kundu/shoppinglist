let express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

/**
 * Add to WishList.
 * TYPE GET
 * http://localhost:3000/api/wishlist/add_to_wishlist?user_id=1&product_id=1
 */
router.get('/add_to_wishlist', function (req, res, next) {
    var dbQuery = {user_id: req.query.user_id, product_id: req.query.product_id};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('wishlist').insertOne(dbQuery, function (err, result) {
            if (err) {
                console.log(err);
            }
            //console.log(JSON.stringify(res));
            res.send({
                Success: true,
                result: result
            });
            db.close();
        });

    });
});


/**
 * GET all products in WishList.
 * TYPE GET
 * http://localhost:3000/api/wishlist/get_wishlist?user_id=1
 */
router.get('/get_wishlist', function (req, res, next) {
    var dbQuery = {user_id: req.query.user_id};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('wishlist').find(dbQuery).toArray(function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    Success: false,
                    result: err
                });
                return;
            }
            for (i in result) {
                delete result[i]._id;
                delete result[i].user_id;
                result[i].id = parseInt(result[i].product_id);
                delete result[i].product_id;
            }
            console.log(result);
            console.log(JSON.stringify(result));
            console.log(JSON.parse(JSON.stringify(result)));
            dbo.collection('products').find({$or: result}).toArray(function (err, result1) {
                if (err) {
                    console.log(err);
                    res.send({
                        Success: false,
                        result: err
                    });
                    return;
                }
                for (i in result1) {
                    delete result1[i]._id;
                    delete result1[i].group;
                    delete result1[i].category;
                    delete result1[i].price_without_discount;
                    delete result1[i].count;
                    delete result1[i].review;
                    delete result1[i].short_description;
                    delete result1[i].long_description;
                    delete result1[i].image_url_1;
                    delete result1[i].image_url_2;
                }
                res.send(
                    result1
                );

                // db.close();
            });
        });

    });
});


/**
 * DELETE product in Wishlist.
 * TYPE DELETE
 * http://localhost:3000/api/wishlist/remove_from_wishlist?user_id=1&product_id=1
 */
router.delete('/remove_from_wishlist', function (req, res, next) {
    var dbQuery = {user_id: req.query.user_id, product_id:  req.query.product_id};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        console.log(dbQuery);
        dbo.collection('wishlist').deleteOne(dbQuery, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.send({
                Success: true,
                result: result
            });
            //console.log(result);
            //console.log(JSON.stringify(res));
            db.close();
        });

    });
});

module.exports = router;