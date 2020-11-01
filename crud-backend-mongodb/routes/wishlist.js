let express = require('express');
const router = express.Router();

/**
 * Add to WishList.
 * TYPE GET
 * http://localhost:3000/api/wishlist/add_to_wishlist?user_id=1&product_id=1
 */
router.get('/add_to_wishlist', function (req, res, next) {

});


/**
 * GET all products in WishList.
 * TYPE GET
 * http://localhost:3000/api/wishlist/get_wishlist?user_id=1
 */
router.get('/get_wishlist', function (req, res, next) {

});


/**
 * DELETE product in Wishlist.
 * TYPE DELETE
 * http://localhost:3000/api/wishlist/remove_from_wishlist?user_id=1&product_id=1
 */
router.delete('/remove_from_wishlist', function (req, res, next) {

});

module.exports = router;