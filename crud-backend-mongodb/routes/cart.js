let express = require('express');
const router = express.Router();

/**
 * Add to Cart.
 * TYPE GET
 * http://localhost:3000/api/cart/add_to_cart?user_id=1&product_id=1&count=1
 */
router.get('/add_to_cart', function (req, res, next) {

});


/**
 * GET all products in Cart.
 * TYPE GET
 * http://localhost:3000/api/cart/get_cart_products?user_id=1
 */
router.get('/get_cart_products', function (req, res, next) {

});


/**
 * DELETE product in Cart.
 * TYPE DELETE
 * http://localhost:3000/api/cart/remove_product?user_id=1&product_id=1
 */
router.delete('/remove_product', function (req, res, next) {

});

module.exports = router;