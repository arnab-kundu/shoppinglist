let express = require('express');
const router = express.Router();
const couchbase = require('couchbase');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
let config = require('../config')



/**
 * Add new Product.
 * TYPE POST
 * http://localhost:3000/api/product/add_product
 * { id: 0, itemName: 'Mobile', itemQuantity: 1, itemBrought: false }
 */
router.post('/add_product', function (req, response, next) {

    console.log(req.body);

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: config.server.username,
            password: config.server.password,
        },
        (err, cluster) => {
            var bucket = cluster.bucket(config.database.bucketName).scope(config.database.scope)
            var coll = bucket.collection("products")

            coll.insert('product_' + uuidv4(), req.body, (err, res) => {
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
 * GET product listing.
 * TYPE GET
 * http://localhost:3000/api/product/products
 * http://localhost:3000/api/product/products?id=c8c2f02c-1b8d-421f-b141-a3acd1adda27
 */
router.get('/products', function (req, response, next) {

    console.log(req.query.id)

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: config.server.username,
            password: config.server.password,
        },
        (err, cluster) => {
            var bucket = cluster.bucket(config.database.bucketName).scope(config.database.scope)
            var coll = bucket.collection("products")

            if (req.query.id == null) {
                coll.get("TODO", (err, res) => {
                    if (err) {
                        console.error("Get Error")
                        response.statusCode = 404
                        response.send(err);
                    }
                    response.statusCode = 200
                    response.send(res.value);
                    return
                })
            }

            coll.get('product_' + req.query.id, (err, res) => {
                if (err) {
                    console.error("Get Error")
                    response.statusCode = 404
                    response.send(err);
                }
                response.statusCode = 200
                response.send(res.value);
            })
        }
    )
});


/**
 * EDIT ITEM
 * TYPE PUT
 * http://localhost:3000/api/product/update_product?id=f351a8b0-b68f-401b-acd3-ac13843c054c
 * BODY { "id": 100, "itemName": "{{$randomProduct}}", "itemQuantity": 1, "itemBrought": false }
 */
router.put('/update_product', function (req, response, next) {

    console.log(req.query.id)
    console.log(req.body)

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: config.server.username,
            password: config.server.password,
        },
        (err, cluster) => {
            var bucket = cluster.bucket(config.database.bucketName).scope(config.database.scope)
            var coll = bucket.collection("products")

            coll.upsert('product_' + req.query.id, req.body, (err, res) => {
                if (err) {
                    console.error("Update Error")
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
 * http://localhost:3000/api/product?id=02450b7b-f534-4cbc-981f-155e17f47d46
 */
router.delete('/', function (req, response, next) {

    console.log(req.query);
    couchbase.connect()
    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: config.server.username,
            password: config.server.password,
        },
        (err, cluster) => {
            var bucket = cluster.bucket(config.database.bucketName).scope(config.database.scope)
            var coll = bucket.collection("products")

            coll.remove("product_" + req.query.id, {}, (err, res) => {
                if (err) {
                    console.error("DELETE Error")
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
