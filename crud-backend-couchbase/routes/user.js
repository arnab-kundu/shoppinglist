var express = require('express');
var router = express.Router();
var couchbase = require('couchbase')
const config = require('../config.json')


/**
 * GET user list
 * TYPE GET
 * http://localhost:3000/api/users
 */
router.get('/users', function (req, response, next) {

  couchbase.connect(
    'couchbase://127.0.0.1',
    {
      username: config.server.username,
      password: config.server.password,
    },
    (err, cluster) => {
      var bucket = cluster.bucket(config.database.bucketName)
      var scope = bucket.scope(config.database.scope)

      scope.query("SELECT * FROM users;", (err, res) => {
        if (err) {
          response.statusCode = 404
          response.send(err);
        }
        response.statusCode = 200
        response.send(res.rows);
        return
      })
    }
  )

});

module.exports = router;
