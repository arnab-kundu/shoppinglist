var express = require('express');
var router = express.Router();
const Item = require('../model/shoppingItem');


/**
 * Add new Item.
 * TYPE POST
 * http://localhost:3000/api/item/add_item
 * { id: 0, itemName: 'Mobile', itemQuantity: 1, itemBrought: false }
 */
router.post('/add_item', (req, res, next) => {
    console.log(req.url);
    let newShoppingItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBrought: req.body.itemBrought
    });
    newShoppingItem.save((err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "inserted"});
        }
    });
});


/**
 * GET ITEM listing.
 * TYPE GET
 * http://localhost:3000/api/item/items
 */
router.get('/items', (req, res, next) => {
    console.log("get");
    Item.find(function (err, items) {
        if (err) {
            res.json(err);
        } else {
            console.log(items);
            res.json(items)
        }
    })
});


/**
 * EDIT ITEM
 * TYPE PUT
 * http://localhost:3000/api/item?id=1
 */
router.put('/', function (req, res, next) {
    console.log(req.query.id);
    Item.findOneAndUpdate(
        {_id: req.query.id},
        { $set: { itemName: req.body.itemName, itemQuantity: req.body.itemQuantity, itemBrought: req.body.itemBrought }},
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
});


/**
 * DELETE ITEM
 * TYPE DELETE
 * http://localhost:3000/api/item?id=1
 */
router.delete('/', function (req, res, next) {
    Item.deleteOne({"_id": req.query.id},
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
});

module.exports = router;