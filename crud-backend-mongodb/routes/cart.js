let express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

/**
 * Add to Cart.
 * TYPE GET
 * http://localhost:3000/api/cart/add_to_cart?user_id=1&product_id=1&count=1
 */
router.get('/add_to_cart', function (req, res, next) {
    var dbQuery = {user_id: req.query.user_id, product_id: req.query.product_id, count: req.query.count};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('cart').insertOne(dbQuery, function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    Success: false,
                    result: err
                });
                return;
            }
            res.send({
                Success: true,
                result: result
            });
            db.close();
        });

    });
});


/**
 * GET all products in Cart.
 * TYPE GET
 * http://localhost:3000/api/cart/get_cart_products?user_id=1
 */
router.get('/get_cart_products', function (req, res, next) {
    var dbQuery = {user_id: req.query.user_id};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('cart').find(dbQuery).toArray(function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    Success: false,
                    result: err
                });
                db.close();
                return;
            }
            for (i in result) {
                delete result[i]._id;
                delete result[i].user_id;
                result[i].id = parseInt(result[i].product_id);
                delete result[i].product_id;
                delete result[i].count;
            }
            console.log(result);
            dbo.collection('products').find({$or: result}).toArray(function (err, result1) {
                if (err) {
                    console.log(err);
                    res.send({
                        Success: false,
                        result: err
                    });
                    db.close();
                    return;
                }
                for (i in result1) {
                    delete result1[i]._id;
                    delete result1[i].group;
                    delete result1[i].category;
                    delete result1[i].price_without_discount;
                    delete result1[i].review;
                    delete result1[i].short_description;
                    delete result1[i].long_description;
                    delete result1[i].image_url_1;
                    delete result1[i].image_url_2;
                    result1[i].product_count = 1;//TODO
                }
                res.send(
                    result1
                );
                db.close();
            });
        });
    });
});


/**
 * DELETE product in Cart.
 * TYPE DELETE
 * http://localhost:3000/api/cart/remove_product?user_id=1&product_id=1
 */
router.delete('/remove_product', function (req, res, next) {
    var dbQuery = {user_id: req.query.user_id, product_id: req.query.product_id};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        console.log(dbQuery);
        dbo.collection('cart').deleteOne(dbQuery, function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    Success: false,
                    result: err
                });
            }
            res.send({
                Success: true,
                result: result
            });
            db.close();
        });
    });
});

module.exports = router;