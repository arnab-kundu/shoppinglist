let express = require('express');
const router = express.Router();
const mysql = require('mysql');

/**
 * Add to Cart.
 * TYPE GET
 * http://localhost:3000/api/cart/add_to_cart?user_id=1&product_id=1&count=1
 */
router.get('/add_to_cart', function (req, res, next) {

    const query = "INSERT INTO `cart` (user_id,product_id,product_count)" +
        " VALUES('" + req.query.user_id + "'," + req.query.product_id + "," + req.query.count + ")" +
        " ON DUPLICATE KEY UPDATE product_count = " + req.query.count + ";";
    let connection = mysql.createConnection({
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
                //console.log("REQUEST: " + req.url);
                res.send(result);
                connection.end();
            });
        }
    });
});


/**
 * GET all products in Cart.
 * TYPE GET
 * http://localhost:3000/api/cart/get_cart_products?user_id=1
 */
router.get('/get_cart_products', function (req, res, next) {

    let query = "SELECT `products`.id,`products`.name,`products`.price,`products`.image_url, t1.product_count FROM `products` RIGHT JOIN(" +
        "SELECT product_id, product_count FROM `cart` WHERE user_id = '" + req.query.user_id +
        "') AS t1 ON `products`.id= t1.product_id GROUP BY `products`.id	;";
    let connection = mysql.createConnection({
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
                //console.log("REQUEST: " + req.url);
                res.send(result);
                connection.end();
            });
        }
    });
});


/**
 * DELETE product in Cart.
 * TYPE DELETE
 * http://localhost:3000/api/cart/remove_product?user_id=1&product_id=1
 */
router.delete('/remove_product', function (req, res, next) {

    let query = "DELETE FROM `cart` where user_id = '" + req.query.user_id + "' AND product_id = " + req.query.product_id + ";";
    let connection = mysql.createConnection({
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
                //console.log("REQUEST: " + req.url);
                res.send(result);
                connection.end();
            });
        }
    });
});

module.exports = router;