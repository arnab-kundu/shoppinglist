let express = require('express');
const router = express.Router();
const mysql = require('mysql');

/**
 * Add to WishList.
 * TYPE GET
 * http://localhost:3000/api/wishlist/add_to_wishlist?user_id=1&product_id=1
 */
router.get('/add_to_wishlist', function (req, res, next) {

    const query = "INSERT IGNORE INTO `wishlist` (user_id,product_id)" +
        " VALUES(" + req.query.user_id + "," + req.query.product_id + ");" ;
        //" ON DUPLICATE KEY UPDATE product_count = " + req.query.count + ";";
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
 * GET all products in WishList.
 * TYPE GET
 * http://localhost:3000/api/wishlist/get_wishlist?user_id=1
 */
router.get('/get_wishlist', function (req, res, next) {

    let query = "SELECT `products`.id,`products`.name,`products`.price, `products`.availability, `products`.image_url FROM `products` RIGHT JOIN(" +
        "SELECT product_id FROM `wishlist` WHERE user_id = " + req.query.user_id +
        ") AS t1 ON `products`.id= t1.product_id GROUP BY `products`.id	;";
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
 * DELETE product in Wishlist.
 * TYPE DELETE
 * http://localhost:3000/api/wishlist/remove_from_wishlist?user_id=1&product_id=1
 */
router.delete('/remove_from_wishlist', function (req, res, next) {

    let query = "DELETE FROM `wishlist` where user_id = " + req.query.user_id + " AND product_id = " + req.query.product_id + ";";
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