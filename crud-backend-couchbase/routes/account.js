let express = require('express');
const router = express.Router();
const couchbase = require('couchbase');
const { v4: uuidv4 } = require('uuid');
let config = require('../config')


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
router.post('/register', function (req, response, next) {

    console.log(req.body);

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: config.server.username,
            password: config.server.password,
        },
        (err, cluster) => {
            var bucket = cluster.bucket(config.database.bucketName).scope(config.database.scope)
            var coll = bucket.collection("users")

            coll.insert('user_' + uuidv4(), req.body, (err, res) => {
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
 * Login user.
 * TYPE POST
 * http://localhost:3000/api/account/login
 *
 * x-www-form-urlencoded
 * email:johndoe@gmail.com
 * password:password
 */
router.post('/login', function (req, response, next) {

    console.log(req.body);

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: config.server.username,
            password: config.server.password,
        },
        (err, cluster) => {
            var bucket = cluster.bucket(config.database.bucketName).scope(config.database.scope)

            bucket.query("SELECT * FROM users WHERE `email` = '" + req.body.email + "' AND `password` = '" + req.body.password + "';", (err, res) => {
                if (err) {
                    console.error("Login Error")
                    response.statusCode = 403
                    response.send(err);
                }
                response.statusCode = 202
                response.send(res.rows[0].users);
            })
        }
    )
});


/**
 * EDIT User
 * TYPE PUT
 * http://localhost:3000/api/account/edit_user?id=d86a7d0c-c246-47a7-8644-54e578b0ce4f
 * BODY { "username": "Arnab", "email": "arnab@gmail.com", "password": "password" }
 *
 * x-www-form-urlencoded
 * username: Arnab
 * email:arnab@gmail.com
 * password:password1
 */
router.put('/edit_user', function (req, response, next) {

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
            var coll = bucket.collection("users")

            coll.upsert('user_' + req.query.id, req.body, (err, res) => {
                if (err) {
                    console.error("Upsert Error")
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
 * DELETE User
 * TYPE DELETE
 * http://localhost:3000/api/account?id=043addc3-a4e3-44c8-8319-406ff32e4e61
 */
router.delete('/', function (req, response, next) {

    console.log(req.query);

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: config.server.username,
            password: config.server.password,
        },
        (err, cluster) => {
            var bucket = cluster.bucket(config.database.bucketName).scope(config.database.scope)
            var coll = bucket.collection("users")

            coll.remove('user_' + req.query.id, (err, res) => {
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


/**
 * Get User.
 * TYPE GET
 * http://localhost:3000/api/account/getUser?id=043addc3-a4e3-44c8-8319-406ff32e4e61
 */
router.get('/getUser', function (req, response, next) {

    couchbase.connect(
        'couchbase://127.0.0.1',
        {
            username: config.server.username,
            password: config.server.password,
        },
        (err, cluster) => {
            var bucket = cluster.bucket(config.database.bucketName).scope(config.database.scope)
            var coll = bucket.collection("users")

            coll.get('user_' + req.query.id, (err, res) => {
                if (err) {
                    console.error("GET Error")
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
