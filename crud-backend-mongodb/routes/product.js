let express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";


/**
 * Add new Item.
 * TYPE POST
 * http://localhost:3000/api/item/add_item
 * { id: 0, itemName: 'Mobile', itemQuantity: 1, itemBrought: false }
 */
router.post('/add_product', function (req, res, next) {

    console.log(req.body);

});


/**
 * GET product listing.
 * TYPE GET
 * http://localhost:3000/api/product/products
 * http://localhost:3000/api/product/products?id=1
 * http://localhost:3000/api/product/products?group=Men
 */
router.get('/products', function (req, res, next) {
    let queryLimit = 8;
    var dbquery = "{}";
    if (req.query.id !== undefined) {
        dbquery = "{\"id\":" + req.query.id + "}".toString();
        //console.log(dbquery);
    }
    if (req.query.group !== undefined) {
        dbquery = "{\"group\":\"" + req.query.group + "\"}".toString();
        //console.log(dbquery);
    }
    //console.log(isNaN(req.query.limit));
    if (req.query.limit !== undefined && !isNaN(req.query.limit)) {
        queryLimit = Number(req.query.limit);
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('products').find(JSON.parse(dbquery)).limit(queryLimit)
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


/**
 * EDIT ITEM
 * TYPE PUT
 * http://localhost:3000/api/item?id=1
 */
router.put('/', function (req, res, next) {

    console.log(req.body)

});


/**
 * DELETE ITEM
 * TYPE DELETE
 * http://localhost:3000/api/item?id=1
 */
router.delete('/', function (req, res, next) {

    console.log(req.query);

});


module.exports = router;
