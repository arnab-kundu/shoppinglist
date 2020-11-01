let express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";


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
    var dbQuery = {};
    if (req.body.email !== undefined && req.body.password !== undefined) {
        dbQuery = {email: req.body.email, password: req.body.password}
    } else {
        res.send({"msg": "missing params"});
        return;
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('users').find(dbQuery)
            .toArray(function (err, result) {
                if (err) throw err;
                for (i in result) {
                    delete result[i]._id;
                }
                res.send(result[0]);
                //console.log(JSON.stringify(res));
                db.close();
            });

    });
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
