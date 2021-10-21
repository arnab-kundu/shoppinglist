var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

/**
 * @TO_RUN
 * cd routes
 * node myjoin
 * @Example_of
 * join in mongodb
 * modify Json response
 * @url
 * https://www.w3schools.com/nodejs/nodejs_mongodb_join.asp
 */

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection('order').aggregate([
        {
            $lookup:
                {
                    from: 'product',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'orderdetails'
                }
        }
    ]).toArray(function (err, res) {
        if (err) throw err;
        for (i in res) {

            res[0].name = "arnba";
            //res[0].delete('orderdetails');
            delete res[0]["orderdetails"];
            console.log(JSON.stringify(res[0]));

        }
        //console.log(JSON.stringify(res));
        db.close();
    });
});