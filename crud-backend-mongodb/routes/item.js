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

router.get('/items', (req, res, next) => {
    res.send("get_items");
});

router.put('/', function (req, res, next) {
    res.send("update_item");
});

router.delete('/', function (req, res, next) {
    res.send("delete_item");
});

module.exports = router;