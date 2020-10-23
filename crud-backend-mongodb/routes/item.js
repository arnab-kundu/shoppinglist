var express = require('express');
var router = express.Router();


router.post('/add_item', (req, res, next) => {
    res.send("add_item");
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