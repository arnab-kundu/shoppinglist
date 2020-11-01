let express = require('express');
const router = express.Router();

/**
 * Add new product into recently_viewed.
 * TYPE GET
 * http://localhost:3000/api/recently_viewed/add_product?user_id=1&product_id=1
 */
router.get('/add_product', function (req, res, next) {

    console.log(req.query.user_id);
    console.log(req.query.product_id);
    res.send({msg:"not implemented"});
});


/**
 * GET recently_viewed products.
 * TYPE GET
 * http://localhost:3000/api/recently_viewed/get_products?user_id=1
 */
router.get('/get_products', function (req, res, next) {

    console.log(req.query.user_id);
    res.send({msg:"not implemented"})
});

module.exports = router;