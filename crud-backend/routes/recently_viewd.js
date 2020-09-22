let express = require('express');
const router = express.Router();
const mysql = require('mysql');

/**
 * Add new product into recently_viewed.
 * TYPE GET
 * http://localhost:3000/api/recently_viewed/add_product?user_id=1&product_id=1
 */
router.get('/add_product', function (req, res, next) {

    const query = "INSERT INTO `recently_viewed` (user_id,product_id,last_seen) " +
        "VALUES(" + req.query.user_id + "," + req.query.product_id + ",CURRENT_TIMESTAMP) " +
        "ON DUPLICATE KEY UPDATE last_seen = CURRENT_TIMESTAMP;";
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
                res.send(result);
                connection.end();
            });
        }
    });
});


/**
 * GET recently_viewed products.
 * TYPE GET
 * http://localhost:3000/api/recently_viewed/get_products?user_id=1
 */
router.get('/get_products', function (req, res, next) {

    var query = "SELECT `products`.* FROM `products` RIGHT JOIN(" +
        "SELECT product_id, last_seen FROM `recently_viewed` WHERE user_id = " + req.query.user_id + " GROUP BY product_id ORDER BY last_seen DESC LIMIT 3" +
        ") AS t1 ON `products`.id = t1.product_id;";
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
                res.send(result);
                connection.end();
            });
        }
    });
});

module.exports = router;