let express = require('express');
const router = express.Router();
const mysql = require('mysql');


/**
 * Add new Item.
 * TYPE POST
 * http://localhost:3000/api/item/add_item
 * { id: 0, itemName: 'Mobile', itemQuantity: 1, itemBrought: false }
 */
router.post('/add_product', function (req, res, next) {

    console.log(req.body);


    var query = "Insert into product values(" + req.body.id + ",'" + req.body.itemName + "'," + req.body.itemQuantity + "," + req.body.itemBrought + ");";

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB conncetion error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log("REQUEST" + req.url);
                //console.log("RESPONSE" + result);
                res.send(result);
                connection.end();
            });
        }
    });
});


/**
 * GET product listing.
 * TYPE GET
 * http://localhost:3000/api/product/products
 * http://localhost:3000/api/product/products?id=1
 */
router.get('/products', function (req, res, next) {

    var query = "SELECT * FROM `products` limit 15;";
    if (req.query.id !== undefined) {
        query = "SELECT * FROM `products` where id = " + req.query.id + ";";
    }


    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB conncetion error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log("REQUEST" + req.url);
                //console.log("RESPONSE" + result);
                res.send(result);
                connection.end();
            });
        }
    });
});


/**
 * EDIT ITEM
 * TYPE PUT
 * http://localhost:3000/api/item?id=1
 */
router.put('/', function (req, res, next) {

    console.log(req.body)


    var query =
        "UPDATE `items` SET `itemName` = '" + req.body.itemName +
        "', `itemQuantity` = " + req.body.itemQuantity +
        ", itemBrought = " + req.body.itemBrought + "  where id = " + req.body.id + ";";

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB conncetion error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log("REQUEST" + req.url);
                //console.log("RESPONSE" + result);
                res.send(result);
                connection.end();
            });
        }
    });
});


/**
 * DELETE ITEM
 * TYPE DELETE
 * http://localhost:3000/api/item?id=1
 */
router.delete('/', function (req, res, next) {

    console.log(req.query);


    var query = "Delete from Items where id = " + req.query.id + ";";

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB conncetion error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log("REQUEST" + req.url);
                //console.log("RESPONSE" + result);
                res.send(result);
                connection.end();
            });
        }
    });
});


module.exports = router;
