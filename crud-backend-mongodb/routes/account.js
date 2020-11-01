let express = require('express');
const router = express.Router();


/**
 * Register new User.
 * TYPE POST
 * http://localhost:3000/api/account/register
 * application/json
 * { "username": "John Doe", "email": "johndoe@gmail.com", "password": "password" }
 * or
 * x-www-form-urlencoded
 * username:John Doe
 * email:johndoe@gmail.com
 * password:password
 */
router.post('/register', function (req, res, next) {

    console.log(req.body);

});


/**
 * Login user.
 * TYPE POST
 * http://localhost:3000/api/account/login
 *
 * x-www-form-urlencoded
 * email:johndoe@gmail.com
 * password:password
 */
router.post('/login', function (req, res, next) {

    console.log(req.body);

});


/**
 * EDIT User
 * TYPE PUT
 * http://localhost:3000/api/account/edit_user?id=1
 *
 * x-www-form-urlencoded
 * username:John Doe1
 * email:johndoe1@gmail.com
 * password:password1
 */
router.put('/edit_user', function (req, res, next) {

    console.log(req.body)

});


/**
 * DELETE User
 * TYPE DELETE
 * http://localhost:3000/api/account?id=1
 */
router.delete('/', function (req, res, next) {

    console.log(req.query);

});


/**
 * Get User.
 * TYPE GET
 * http://localhost:3000/api/account/getUser?id=0d2ad590-fece-11ea-9959-ef927820ccec
 */
router.get('/getUser', function (req, res, next) {

    console.log(req.query);

});
module.exports = router;
