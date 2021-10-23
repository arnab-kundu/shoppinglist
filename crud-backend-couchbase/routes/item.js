var express = require('express');
var router = express.Router();
var couchbase = require('couchbase');

/////////////
// COMPLETED
/////////////


/**
 * Add new Item.
 * TYPE POST
 * http://localhost:3000/api/item/add_item
 * { id: 0, itemName: 'Mobile', itemQuantity: 1, itemBrought: false }
 */
router.post('/add_item', function (req, response, next) {

    console.log(req.body);

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: 'Administrator',
            password: '123456',
        },
        (err, cluster) => {
            var bucket = cluster.bucket('shoppinglist')
            var coll = bucket.defaultCollection()

            coll.insert('item', req.body, (err, res) => {
                if (err) {
                    console.error("Insert Error")
                    response.statusCode = 409
                    response.send(err);
                }
                response.statusCode = 201
                response.send(res.value);
            })
        }
    )
});


/**
 * GET ITEM listing.
 * TYPE GET
 * http://localhost:3000/api/item/items
 */
router.get('/items', function (req, response, next) {

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: 'Administrator',
            password: '123456',
        },
        (err, cluster) => {
            var bucket = cluster.bucket('shoppinglist')
            var coll = bucket.defaultCollection()

            coll.get('item', (err, res) => {
                if (err) {
                    console.error(err)
                    response.statusCode = 404
                    response.send(err);
                }

                //console.log("response", res)
                response.statusCode = 200
                response.send(res.value);
            })
        }
    )
});


/**
 * EDIT ITEM
 * TYPE PUT
 * http://localhost:3000/api/item?id=1
 * { id: 0, itemName: 'Laptop', itemQuantity: 1, itemBrought: false }
 */
router.put('/', function (req, response, next) {

    console.log(req.body)

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: 'Administrator',
            password: '123456',
        },
        (err, cluster) => {
            var bucket = cluster.bucket('shoppinglist')
            var coll = bucket.defaultCollection()

            coll.upsert('item', req.body, (err, res) => {
                if (err) {
                    console.error("upsert Error")
                    response.statusCode = 400
                    response.send(err);
                }
                response.statusCode = 200
                response.send(res.value);
            })
        }
    )
});


/**
 * DELETE ITEM
 * TYPE DELETE
 * http://localhost:3000/api/item?id=1
 */
router.delete('/', function (req, response, next) {

    console.log(req.query);

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: 'Administrator',
            password: '123456',
        },
        (err, cluster) => {
            var bucket = cluster.bucket('shoppinglist')
            var coll = bucket.defaultCollection()

            coll.remove("item" ,{}, (err, res) => {
                if (err) {
                    console.error("DELETE Error")
                    console.error(err)
                    response.statusCode = 404
                    response.send(err);
                }
                response.statusCode = 200
                response.send(res.value);
            })
        }
    )
});


module.exports = router;
