var express = require('express');
var router = express.Router();
const uuid = require('uuid');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

/**
 * GET
 * Insert dummy data to mongodb
 * http://localhost:3000
 */
router.get('/', function (req, res, next) {
   res.render('index', {title: 'Express Mongo DB'});
    var dbQuery = "[\n" +
        "{\n" +
        "\"id\": 1,\n" +
        "\"name\": \"Rajput T-Shirt\",\n" +
        "\"group\": \"Men\",\n" +
        "\"category\": \"T-Shirts\",\n" +
        "\"price\": 37.5,\n" +
        "\"price_without_discount\": null,\n" +
        "\"count\": 3,\n" +
        "\"availability\": \"In Stock\",\n" +
        "\"review\": 9735,\n" +
        "\"short_description\": \"Laboriosam dolorum eos quis. Sapiente labore voluptas omnis cum! Voluptas est?\",\n" +
        "\"long_description\": \"Dolor iusto consequatur; error labore suscipit. Harum asperiores voluptatem ratione laudantium alias id. Veniam qui rerum labore natus cumque. Modi ex cumque.\",\n" +
        "\"image_url\": \"https://bhainskiankh.com/wp-content/uploads/2020/08/1-6-300x300-1.jpg\",\n" +
        "\"image_url_1\": \"https://bhainskiankh.com/wp-content/uploads/2020/08/1-6-300x300-1.jpg\",\n" +
        "\"image_url_2\": \"https://bhainskiankh.com/wp-content/uploads/2020/08/1-6-300x300-1.jpg\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 2,\n" +
        "\"name\": \"DSLR Camera\",\n" +
        "\"group\": \"Digital\",\n" +
        "\"category\": \"Camera\",\n" +
        "\"price\": 8725,\n" +
        "\"price_without_discount\": null,\n" +
        "\"count\": 36504,\n" +
        "\"availability\": \"Out of Stock\",\n" +
        "\"review\": 21031,\n" +
        "\"short_description\": \"Et voluptatem laborum. Reiciendis non error ut. Sapiente minima eveniet.\",\n" +
        "\"long_description\": \"Qui dolorem quaerat assumenda necessitatibus et ut...\",\n" +
        "\"image_url\": \"https://i.pinimg.com/originals/1c/4e/8e/1c4e8eddcd7c39fe3b959bb1d2cb4f89.jpg\",\n" +
        "\"image_url_1\": \"http://shoenthest.ua/omeitand/stngve/stith/tiheandeve.htm\",\n" +
        "\"image_url_2\": \"https://www.waatle.se/oulndre/ouomeerathi.htm#03778\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 3,\n" +
        "\"name\": \"Kids\",\n" +
        "\"group\": \"Kids\",\n" +
        "\"category\": \"Standard\",\n" +
        "\"price\": 45.9,\n" +
        "\"price_without_discount\": null,\n" +
        "\"count\": 7,\n" +
        "\"availability\": \"Comming Soon\",\n" +
        "\"review\": 4762,\n" +
        "\"short_description\": \"Quasi doloremque qui. Voluptas eos dicta maxime! Enim architecto et ipsa ut.\",\n" +
        "\"long_description\": \"Aut fugiat veritatis. Reiciendis voluptatem pariatur. Corporis et consequuntur; sit necessitatibus animi. Dolores esse error; commodi veritatis iste. Error...\",\n" +
        "\"image_url\": \"https://i.pinimg.com/originals/5c/bc/09/5cbc09a31a1fb7b3f64cad5d738c31e9.jpg\",\n" +
        "\"image_url_1\": \"https://letedthiwa.ge/atantio/ntshose/orthied.php?t=59&p=5039\",\n" +
        "\"image_url_2\": \"https://www.tioastioat.it/ithorhat/the/butvest/erwayoutio.php\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 4,\n" +
        "\"name\": \"HP Laptop\",\n" +
        "\"group\": \"Digital\",\n" +
        "\"category\": \"Laptop\",\n" +
        "\"price\": 52000,\n" +
        "\"price_without_discount\": 60000,\n" +
        "\"count\": 52038,\n" +
        "\"availability\": \"Out of Stock\",\n" +
        "\"review\": 3445,\n" +
        "\"short_description\": \"Esse quis natus magni exercitationem.\",\n" +
        "\"long_description\": \"Sit aperiam ad perspiciatis temporibus quis inventore. Qui sit voluptatibus nisi nostrum deserunt laudantium.\",\n" +
        "\"image_url\": \"https://i.pinimg.com/originals/8f/1a/81/8f1a810ad2db0e13f3986e7b8d0ea64b.jpg\",\n" +
        "\"image_url_1\": \"https://hathioror.se/thehasho/omehatver/allineauld.htm\",\n" +
        "\"image_url_2\": \"http://www.vertiwitwa.ge/lehand/eatiha/his/arengyouwit.asp\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 5,\n" +
        "\"name\": \"Kurti\",\n" +
        "\"group\": \"Women\",\n" +
        "\"category\": \"Kurta & Kurti\",\n" +
        "\"price\": 177.3,\n" +
        "\"price_without_discount\": 499,\n" +
        "\"count\": 8553,\n" +
        "\"availability\": \"In Stock\",\n" +
        "\"review\": 37319,\n" +
        "\"short_description\": \"Dolor qui quidem; unde ut enim rerum in. Corrupti ratione quae iste!\",\n" +
        "\"long_description\": \"Ut autem ipsa error dolor vero dolore.\",\n" +
        "\"image_url\": \"https://lehenga-saree.com/wp-content/uploads/2020/02/13802-250x300.jpg\",\n" +
        "\"image_url_1\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1nXWGFG533Gy4xGNqOdIvBFhcI8sZn5YnA0tQYiXSyNsrMpeAEnXAldaeiBHh6vXBbjBBwyY&usqp=CAc\",\n" +
        "\"image_url_2\": \"https://ournotionome.de/hadoume/ing/hateaas/omeeantbut.php\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 6,\n" +
        "\"name\": \"India\",\n" +
        "\"group\": \"Sports\",\n" +
        "\"category\": \"Polo T-Shirts\",\n" +
        "\"price\": 250,\n" +
        "\"price_without_discount\": 300,\n" +
        "\"count\": 30291,\n" +
        "\"availability\": \"In Stock\",\n" +
        "\"review\": 53714,\n" +
        "\"short_description\": \"Veritatis earum; vero culpa veritatis delectus ut.\",\n" +
        "\"long_description\": \"Autem at est velit. Nulla numquam tempore consequatur. Ut quaerat explicabo vel? Nesciunt et voluptas. Sequi ut eum? Quam aut sapiente.\",\n" +
        "\"image_url\": \"https://images-eu.ssl-images-amazon.com/images/I/31pGvRj2xiL._SY300_QL70_ML2_.jpg\",\n" +
        "\"image_url_1\": \"https://www.arithissho.fi/enthiare/st/tioeaalleve.asp?id=122\",\n" +
        "\"image_url_2\": \"http://anha.tw/atthe/ismethwa.php\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 7,\n" +
        "\"name\": \"Pink Top\",\n" +
        "\"group\": \"Women\",\n" +
        "\"category\": \"Tops\",\n" +
        "\"price\": 23,\n" +
        "\"price_without_discount\": null,\n" +
        "\"count\": 47359,\n" +
        "\"availability\": \"Comming Soon\",\n" +
        "\"review\": 20137,\n" +
        "\"short_description\": \"Quis animi. Non perspiciatis! Exercitationem laudantium quia eos suscipit.\",\n" +
        "\"long_description\": \"Voluptates harum et quod quo. Non quod ut voluptate! Aut et hic sed? Optio a deserunt ut provident aut!\",\n" +
        "\"image_url\": \"https://rukminim1.flixcart.com/image/300/300/k2z1t3k0/top/y/c/z/s-15199535-only-original-imafm6xahfetksga.jpeg?q=90\",\n" +
        "\"image_url_1\": \"https://waith.il/and/itenhad/enttio/aslealleve.htm\",\n" +
        "\"image_url_2\": \"http://ourteallhad.tw/oruld/rengenth.htm\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 8,\n" +
        "\"name\": \"Nokia\",\n" +
        "\"group\": \"Digital\",\n" +
        "\"category\": \"Mobile\",\n" +
        "\"price\": 8649,\n" +
        "\"price_without_discount\": null,\n" +
        "\"count\": 22663,\n" +
        "\"availability\": \"In Stock\",\n" +
        "\"review\": 50516,\n" +
        "\"short_description\": \"Voluptate laborum eius nemo quam. Quibusdam perspiciatis; tempora error.\",\n" +
        "\"long_description\": \"Ut distinctio voluptatem in voluptatem quia tempora. Consequatur cum mollitia. In voluptatem molestiae! At sed nostrum? Numquam deserunt incidunt. Rem dolor.\",\n" +
        "\"image_url\": \"https://images-eu.ssl-images-amazon.com/images/I/41Cj0uL9-GL._SY300_QL70_ML2_.jpg\",\n" +
        "\"image_url_1\": \"http://www.anisesthe.ch/foritour/hiserehad/yououlnt/onbutnot.html#28997\",\n" +
        "\"image_url_2\": \"http://waatverhen.fi/henterhin/inghis.htm#74\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 9,\n" +
        "\"name\": \"Saree\",\n" +
        "\"group\": \"Women\",\n" +
        "\"category\": \"Sarees\",\n" +
        "\"price\": 345,\n" +
        "\"price_without_discount\": 500,\n" +
        "\"count\": 27555,\n" +
        "\"availability\": \"Out of Stock\",\n" +
        "\"review\": 26680,\n" +
        "\"short_description\": \"Est nihil iste et totam.\",\n" +
        "\"long_description\": \"Ut eos qui quia fuga quas est; ex sit illum iste debitis ullam modi.\",\n" +
        "\"image_url\": \"https://cdn.shopify.com/s/files/1/1146/5686/products/28faa455-1456-4218-a94b-d00ff809e872_300x300.jpg?v=1584459175\",\n" +
        "\"image_url_1\": \"http://wittetedted.org/nt/ere/isare/teortibut.php?t=52&p=78\",\n" +
        "\"image_url_2\": \"https://www.reyouenera.ch/iste/nest/teingar/wasththte.html#10\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 10,\n" +
        "\"name\": \"Full T-Shirt\",\n" +
        "\"group\": \"Men\",\n" +
        "\"category\": \"Standard\",\n" +
        "\"price\": 55,\n" +
        "\"price_without_discount\": null,\n" +
        "\"count\": 19812,\n" +
        "\"availability\": \"In Stock\",\n" +
        "\"review\": 13030,\n" +
        "\"short_description\": \"Sit voluptates aut itaque. Accusantium odit. Dolores et.\",\n" +
        "\"long_description\": \"Numquam nihil dicta. Odit vitae aliquid? Sit sint laboriosam. Quasi ipsa vel. Tempora nam ut! Possimus enim tenetur; odio iste in. Sit nostrum quos. Optio et.\",\n" +
        "\"image_url\": \"https://hiphopkidz.co/wp-content/uploads/2016/04/tshirt_adv_2015_1-250x300.jpg\",\n" +
        "\"image_url_1\": \"http://hatandisne.tr/anhen/uld/butareti/athisin.php\",\n" +
        "\"image_url_2\": \"http://ntederete.cn/eve/ndngterte.aspx\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 11,\n" +
        "\"name\": \"Sneakers\",\n" +
        "\"group\": \"Men\",\n" +
        "\"category\": \"Shoes\",\n" +
        "\"price\": 638,\n" +
        "\"price_without_discount\": null,\n" +
        "\"count\": 638,\n" +
        "\"availability\": \"Out of Stock\",\n" +
        "\"review\": 6,\n" +
        "\"short_description\": \"Est dolor. Quidem minima fuga quae in.\",\n" +
        "\"long_description\": \"Aut optio qui. Sequi eveniet ullam! Nesciunt error corporis aliquid possimus commodi veritatis. Sed sint omnis. Cumque unde nobis. Perspiciatis eius mollitia.\",\n" +
        "\"image_url\": \"https://i.pinimg.com/474x/18/8d/3d/188d3db42440079f62b7686003f162d2.jpg\",\n" +
        "\"image_url_1\": \"https://eraitheaare.at/edalto/tha/tedntea/witomeiteve.htm#54728\",\n" +
        "\"image_url_2\": \"https://alerawas.au/ve/sthisreion.php?t=71&p=8180\"\n" +
        "},\n" +
        "{\n" +
        "\"id\": 12,\n" +
        "\"name\": \"White Shirt\",\n" +
        "\"group\": \"Men\",\n" +
        "\"category\": \"Shirts\",\n" +
        "\"price\": 399,\n" +
        "\"price_without_discount\": null,\n" +
        "\"count\": 3399,\n" +
        "\"availability\": \"Comming Soon\",\n" +
        "\"review\": 48844,\n" +
        "\"short_description\": \"Et labore perspiciatis sed hic.\",\n" +
        "\"long_description\": \"Dolore veniam ducimus neque ullam sint blanditiis. Voluptas sequi sed omnis suscipit quasi iusto.\",\n" +
        "\"image_url\": \"https://signatario.co.in/image/cache/catalog/Final_Images/9626Fr00RCHBR%20collar-250x300.jpg\",\n" +
        "\"image_url_1\": \"http://www.tiarithfor.kr/enarhe/edngeveea.htm\",\n" +
        "\"image_url_2\": \"http://mehenvefor.hk/esarera/neoul.php?t=98\"\n" +
        "}\n" +
        "]";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('products').insertMany(JSON.parse(dbQuery), function (err, result) {
            if (err) {
                console.log(err);
            }
            //console.log(JSON.stringify(res));
            db.close();
        });

    });
    var query = {id: uuid.v1(), username: "Arnab", email: "arnab@gmail.com", password: "password"};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("shoppinglist");
        dbo.collection('users').insertOne(query, function (err, result) {
            if (err){
                console.log(err);
            }
            //console.log(JSON.stringify(res));
            db.close();
        });

    });

});

module.exports = router;
