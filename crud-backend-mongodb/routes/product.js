let express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";


/**
 * Add new Product.
 * TYPE POST
 * http://localhost:3000/api/product/add_product
 [
 {"id": 41, "name": "Lee", "group": "Men", "category": "Jeans", "price": 599, "price_without_discount": null, "count": 5, "availability": "Comming Soon", "review": 18160, "short_description": "Labore harum. Quia ipsum suscipit; porro excepturi. Reiciendis quis? Illum.", "long_description": "Atque optio architecto ea aut necessitatibus ducimus. Consequatur magni cupiditate similique quis est et. Laudantium rerum sint omnis aperiam autem aut.", "image_url": "https://i.ebayimg.com/images/g/OA8AAOSwNmVaXV-S/s-l300.jpg"},
 {"id": 51, "name": "Levis", "group": "Men", "category": "Jeans", "price": 2999, "price_without_discount": null, "count": 10, "availability": "In Stock", "review": 5, "short_description": "Some text", "long_description": "bla bla", "image_url": "https://rukminim1.flixcart.com/image/300/300/jtn9bww0/jean/m/h/3/32-74659-0005-levi-s-original-imafeuz3jfw8bcvd.jpeg?q=90"}
 ]
 */
router.post('/add_product', function (req, res, next) {
    if (req.body.length <= 0) {
        res.status(400).send({Success: false, massage: "Missing request body"});
        return;
    }
    for (let i = 0; i < req.body.length; i++) {
        if (req.body[i].id === undefined) {
            res.status(400).send({Success: false, massage: "Missing id params"});
            return;
        }
        if (req.body[i].name === undefined) {
            res.status(400).send({Success: false, massage: "Missing name params"});
            return;
        }
        if (req.body[i].group === undefined) {
            res.status(400).send({Success: false, massage: "Missing group params"});
            return;
        }
        if (req.body[i].category === undefined) {
            res.status(400).send({Success: false, massage: "Missing category params"});
            return;
        }
        if (req.body[i].price === undefined) {
            res.status(400).send({Success: false, massage: "Missing price params"});
            return;
        }
        if (req.body[i].price_without_discount === undefined) {
            res.status(400).send({Success: false, massage: "Missing price_without_discount params"});
            return;
        }
        if (req.body[i].count === undefined) {
            res.status(400).send({Success: false, massage: "Missing count params"});
            return;
        }
        if (req.body[i].availability === undefined) {
            res.status(400).send({Success: false, massage: "Missing availability params"});
            return;
        }
        if (req.body[i].review === undefined) {
            res.status(400).send({Success: false, massage: "Missing review params"});
            return;
        }
        if (req.body[i].short_description === undefined) {
            res.status(400).send({Success: false, massage: "Missing short_description params"});
            return;
        }
        if (req.body[i].long_description === undefined) {
            res.status(400).send({Success: false, massage: "Missing long_description params"});
            return;
        }
        if (req.body[i].image_url === undefined) {
            res.status(400).send({Success: false, massage: "Missing image_url params"});
            return;
        }
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('products').insertMany(req.body, function (err, result) {
            if (err) {
                res.send({Success: false});
                return;
            }
            res.send({Success: true});
            db.close();
        });
    });
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
 * EDIT Product
 * TYPE PUT
 * http://localhost:3000/api/product/edit_product?id=1
 */
router.put('/', function (req, res, next) {

    console.log(req.body)

});


/**
 * DELETE Product
 * TYPE DELETE
 * http://localhost:3000/api//product/delete_product?id=1
 */
router.delete('/', function (req, res, next) {

    console.log(req.query);

});


module.exports = router;
