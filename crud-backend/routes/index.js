var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "shoppinglist"
    });
    var query = "CREATE TABLE IF NOT EXISTS `products` (" +
        "  `id` int(11) NOT NULL AUTO_INCREMENT," +
        "  `name` varchar(20) NOT NULL," +
        "  `group` enum('Men','Women','Kids','Sports','Digital','Furniture') NOT NULL," +
        "  `category` enum('Casual','Sports','Formal','Standard','T-Shirts','Shirts','Jeans','Trousers','Sleep Wear','Sandals','Loafers','Kurta & Kurti','Sarees','Shoes','Rings','Earrings','Jewellery Sets','Lockets','Polo T-Shirts','SKirts','Jackets','Tops','Make Up','Hair Care','Perfumes','Skin Care','Hand Bags','Single Bags','Travel Bags','Wallets & Belts','Sunglases','Nail','Camera','Mobile','Tablet','Laptop','Accessories') NOT NULL," +
        "  `price` float unsigned NOT NULL," +
        "  `price_without_discount` float unsigned DEFAULT NULL," +
        "  `count` smallint(11) unsigned NOT NULL, " +
        "  `availability` enum('In Stock','Out of Stock','Comming Soon') NOT NULL," +
        "  `review` smallint(11) unsigned NOT NULL," +
        "  `short_description` varchar(100) NOT NULL," +
        "  `long_description` varchar(255) NOT NULL," +
        "  `image_url` varchar(255) NOT NULL," +
        "  `image_url_1` varchar(255) NOT NULL," +
        "  `image_url_2` varchar(255) NOT NULL, " +
        "  PRIMARY KEY (`id`)" +
        "); ";

    var productInsertQuery = "insert IGNORE into `products`(`id`,`name`,`group`,`category`,`price`,`price_without_discount`,`count`,`availability`,`review`,`short_description`,`long_description`,`image_url`,`image_url_1`,`image_url_2`) values (1,'Rajput T-Shirt','Men','T-Shirts',37.5,NULL,3,'In Stock',9735,'Laboriosam dolorum eos quis. Sapiente labore voluptas omnis cum! Voluptas est?','Dolor iusto consequatur; error labore suscipit. Harum asperiores voluptatem ratione laudantium alias id. Veniam qui rerum labore natus cumque. Modi ex cumque.','https://bhainskiankh.com/wp-content/uploads/2020/08/1-6-300x300-1.jpg','https://bhainskiankh.com/wp-content/uploads/2020/08/1-6-300x300-1.jpg','https://bhainskiankh.com/wp-content/uploads/2020/08/1-6-300x300-1.jpg'),(2,'DSLR Camera','Digital','Camera',8725,NULL,36504,'Out of Stock',21031,'Et voluptatem laborum. Reiciendis non error ut. Sapiente minima eveniet.','Qui dolorem quaerat assumenda necessitatibus et ut...','https://i.pinimg.com/originals/1c/4e/8e/1c4e8eddcd7c39fe3b959bb1d2cb4f89.jpg','http://shoenthest.ua/omeitand/stngve/stith/tiheandeve.htm','https://www.waatle.se/oulndre/ouomeerathi.htm#03778'),(3,'Kids','Kids','Standard',45.9,NULL,7,'Comming Soon',4762,'Quasi doloremque qui. Voluptas eos dicta maxime! Enim architecto et ipsa ut.','Aut fugiat veritatis. Reiciendis voluptatem pariatur. Corporis et consequuntur; sit necessitatibus animi. Dolores esse error; commodi veritatis iste. Error...','https://i.pinimg.com/originals/5c/bc/09/5cbc09a31a1fb7b3f64cad5d738c31e9.jpg','https://letedthiwa.ge/atantio/ntshose/orthied.php?t=59&p=5039','https://www.tioastioat.it/ithorhat/the/butvest/erwayoutio.php'),(4,'HP Laptop','Digital','Laptop',52000,60000,52038,'Out of Stock',3445,'Esse quis natus magni exercitationem.','Sit aperiam ad perspiciatis temporibus quis inventore. Qui sit voluptatibus nisi nostrum deserunt laudantium.','https://i.pinimg.com/originals/8f/1a/81/8f1a810ad2db0e13f3986e7b8d0ea64b.jpg','https://hathioror.se/thehasho/omehatver/allineauld.htm','http://www.vertiwitwa.ge/lehand/eatiha/his/arengyouwit.asp'),(5,'Kurti','Women','Kurta & Kurti',177.3,499,8553,'In Stock',37319,'Dolor qui quidem; unde ut enim rerum in. Corrupti ratione quae iste!','Ut autem ipsa error dolor vero dolore.','https://lehenga-saree.com/wp-content/uploads/2020/02/13802-250x300.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1nXWGFG533Gy4xGNqOdIvBFhcI8sZn5YnA0tQYiXSyNsrMpeAEnXAldaeiBHh6vXBbjBBwyY&usqp=CAc','https://ournotionome.de/hadoume/ing/hateaas/omeeantbut.php'),(6,'India','Sports','Polo T-Shirts',250,300,30291,'In Stock',53714,'Veritatis earum; vero culpa veritatis delectus ut.','Autem at est velit. Nulla numquam tempore consequatur. Ut quaerat explicabo vel? Nesciunt et voluptas. Sequi ut eum? Quam aut sapiente.','https://images-eu.ssl-images-amazon.com/images/I/31pGvRj2xiL._SY300_QL70_ML2_.jpg','https://www.arithissho.fi/enthiare/st/tioeaalleve.asp?id=122','http://anha.tw/atthe/ismethwa.php'),(7,'Pink Top','Women','Tops',23,NULL,47359,'Comming Soon',20137,'Quis animi. Non perspiciatis! Exercitationem laudantium quia eos suscipit.','Voluptates harum et quod quo. Non quod ut voluptate! Aut et hic sed? Optio a deserunt ut provident aut!','https://rukminim1.flixcart.com/image/300/300/k2z1t3k0/top/y/c/z/s-15199535-only-original-imafm6xahfetksga.jpeg?q=90','https://waith.il/and/itenhad/enttio/aslealleve.htm','http://ourteallhad.tw/oruld/rengenth.htm'),(8,'Nokia','Digital','Mobile',8649,NULL,22663,'In Stock',50516,'Voluptate laborum eius nemo quam. Quibusdam perspiciatis; tempora error.','Ut distinctio voluptatem in voluptatem quia tempora. Consequatur cum mollitia. In voluptatem molestiae! At sed nostrum? Numquam deserunt incidunt. Rem dolor.','https://images-eu.ssl-images-amazon.com/images/I/41Cj0uL9-GL._SY300_QL70_ML2_.jpg','http://www.anisesthe.ch/foritour/hiserehad/yououlnt/onbutnot.html#28997','http://waatverhen.fi/henterhin/inghis.htm#74'),(9,'Saree','Women','Sarees',345,500,27555,'Out of Stock',26680,'Est nihil iste et totam.','Ut eos qui quia fuga quas est; ex sit illum iste debitis ullam modi.','https://cdn.shopify.com/s/files/1/1146/5686/products/28faa455-1456-4218-a94b-d00ff809e872_300x300.jpg?v=1584459175','http://wittetedted.org/nt/ere/isare/teortibut.php?t=52&p=78','https://www.reyouenera.ch/iste/nest/teingar/wasththte.html#10'),(10,'Full T-Shirt','Men','Standard',55,NULL,19812,'In Stock',13030,'Sit voluptates aut itaque. Accusantium odit. Dolores et.','Numquam nihil dicta. Odit vitae aliquid? Sit sint laboriosam. Quasi ipsa vel. Tempora nam ut! Possimus enim tenetur; odio iste in. Sit nostrum quos. Optio et.','https://hiphopkidz.co/wp-content/uploads/2016/04/tshirt_adv_2015_1-250x300.jpg','http://hatandisne.tr/anhen/uld/butareti/athisin.php','http://ntederete.cn/eve/ndngterte.aspx'),(11,'Sneakers','Men','Shoes',638,NULL,638,'Out of Stock',6,'Est dolor. Quidem minima fuga quae in.','Aut optio qui. Sequi eveniet ullam! Nesciunt error corporis aliquid possimus commodi veritatis. Sed sint omnis. Cumque unde nobis. Perspiciatis eius mollitia.','https://i.pinimg.com/474x/18/8d/3d/188d3db42440079f62b7686003f162d2.jpg','https://eraitheaare.at/edalto/tha/tedntea/witomeiteve.htm#54728','https://alerawas.au/ve/sthisreion.php?t=71&p=8180'),(12,'White Shirt','Men','Shirts',399,NULL,3399,'Comming Soon',48844,'Et labore perspiciatis sed hic.','Dolore veniam ducimus neque ullam sint blanditiis. Voluptas sequi sed omnis suscipit quasi iusto.','https://signatario.co.in/image/cache/catalog/Final_Images/9626Fr00RCHBR%20collar-250x300.jpg','http://www.tiarithfor.kr/enarhe/edngeveea.htm','http://mehenvefor.hk/esarera/neoul.php?t=98'),(13,'Back Pack','Men','Hand Bags',983,1000,42256,'Out of Stock',52338,'Quia dolor et maxime provident. Vero quibusdam. Quibusdam qui. Magni ad.','Nam est et ex nobis distinctio ullam. Tempore sit nam aut impedit dolor id.','https://tenxpro.com/wp-content/uploads/2014/10/accessories.jpg','http://www.andedat.es/hisou/anarnotnot.htm','https://www.shobutse.it/ntent/orheed/ngening/tonotentit.asp'),(14,'Samsusg Tab A','Digital','Tablet',6500,NULL,65,'In Stock',27034,'Et minima dolores voluptas vel.','Molestiae sunt facere non cumque dolor alias.','https://www.worldoftablet.com/wp-content/uploads/2019/10/samsung-galaxy-tab-s5e-1-250x300.jpg','https://www.foronver.it/atouror/andwas.aspx?id=823','http://www.isallmehat.ge/ittedall/erayoues/entshoes/wittedenas.aspx'),(15,'Designer Belt','Men','Wallets & Belts',414,NULL,414,'Comming Soon',7107,'Debitis laudantium et repellendus excepturi. Voluptas voluptatem. Esse sunt.','Porro adipisci voluptas. Magnam natus quibusdam. Aut blanditiis est. Eos a tempora. Et architecto placeat. Aut ratione sunt. Error eaque quod. Tempore unde;','https://www.hpleather.biz/image/cache/products/02_leather/Leather%20Belts%20For%20Women/03-250x300.jpg','http://teleeroul.dk/tiwitter/eraester/asening/rearitwit.htm','http://www.attheouith.tr/hisalhat/ourlewit/oul/forbuttenot.asp'),(16,'Tabholdry','Kids','Laptop',7797850,NULL,7897,'Out of Stock',63987,'Nulla vitae vero molestias nam...','Omnis itaque quis error et ut. Ab nulla labore velit sit iste quia. Omnis voluptatibus aut accusamus et.','http://www.ereea.mx/ing/ithstnot/entinthe/nothenoutio.php?t=10&p=5608','https://eseaourne.hu/heingnt/alion.asp','http://www.nehadntan.it/ited/hinhentedtha.php?t=39&p=64'),(17,'Playtinor','Digital','Sarees',24,NULL,24,'In Stock',55949,'Ipsa quisquam est sed. Sequi autem quaerat ad deleniti! Est quaerat.','Adipisci et culpa. Laborum unde animi obcaecati qui molestiae! Quidem laudantium facilis quam? Ut deserunt ipsam. Nulla dolores qui omnis error sed.','https://inndar.au/thi/esforterthe.php','http://ionernton.mx/ourar/leseshohis.aspx','http://www.shoshothoul.es/theraou/terith/allthaea/ionyouarewa.php?t=17&p=15'),(18,'Tabjecter','Kids','Tablet',5724260,NULL,1255,'Out of Stock',3631,'Non assumenda tenetur eum omnis.','Nihil molestias asperiores. Necessitatibus vero ut. Ipsum adipisci voluptatem. Nemo rerum quia! Deleniti perspiciatis voluptatibus. Sit quidem dolor. Sed!','http://hinentedon.de/younotal/hen/sthisas/ntbutwitis.asp','https://ouonas.cn/istheall/ourndhehat.php?t=59&p=558','http://www.theandwasat.lu/me/tereded/uldti/ngtedbuten.asp'),(19,'Combanderlet','Furniture','Camera',8694940,NULL,59680,'Comming Soon',46849,'Consectetur amet eius sequi nostrum. Laudantium unde non mollitia; ratione.','Tempore debitis nihil dolorem omnis blanditiis. At labore rerum id vitae ullam. Delectus laudantium fugiat. Vel aut rerum. Magni id rem.','https://www.verevehente.au/leoubut/alistio/arngte.htm#6','https://www.forin.de/leareas/itnotareer.htm','http://www.mear.au/alome/forouhat/eveener/heerehathin.php?t=44&p=6175'),(20,'Printholdopon','Women','Skin Care',3453,NULL,3453,'In Stock',41737,'Asperiores modi est. Fugiat repellat quisquam animi! Veniam cupiditate.','Et est dignissimos. Rerum aut nesciunt; eius et sed. Sit quos et. Dolore voluptas natus. Tenetur adipisci et; harum ea ipsa.','https://www.enareas.de/ndwaser/on/atthte/hatenionver.htm','https://www.youere.at/ereoulme/waoritwa.asp','https://www.evees.org/tiareed/ndhertio/ent/thise.asp?id=36'),(21,'Mictaanlet','Women','Jewellery Sets',7748,NULL,7748,'Out of Stock',53886,'Hic aliquam aut doloribus. Natus soluta et quia aspernatur!','Facere voluptatem recusandae qui quas quaerat officiis. Voluptatem sed inventore voluptatem ipsam? Velit aut eligendi sequi praesentium. Minima unde et aut...','https://www.ingoulourhi.nl/areesme/wastertha.asp','https://areonentuld.ge/le/asherthaand.asp','http://www.enthaverthe.tw/ver/entherher.htm'),(22,'Comcycler','Sports','Travel Bags',9947960,NULL,36921,'In Stock',36621,'Sed natus doloribus beatae voluptatum.','Voluptatem perspiciatis et ut iure culpa vitae. Voluptatem vel sequi voluptate fugit ad sed.','https://tehihaall.at/sthen/histiing.asp','http://www.thaeneding.be/ening/era/ereon/ealeverea.php?t=85&p=8802','http://www.esesarbut.nl/seandor/uldit/antited/thaerewasthi.asp'),(23,'Suptellon','Sports','Skin Care',8745,NULL,8745,'Comming Soon',8140,'Est tenetur facilis. Enim unde; veniam molestiae. Cumque magni. Nesciunt modi.','Sit ipsum voluptatem; voluptatem consequatur odio. Quibusdam impedit provident? Non unde molestias! Quia tempore officiis. Odio nisi et. Iste dicta aperiam.','http://isuldbut.hu/thaalloul/hithear/eahein/inghimeer.htm','http://www.uldereyount.cz/issenot/wit/ent/hadithever.htm','http://enforasuld.gr/ea/ststion/ourwas.php?t=10'),(24,'Biwoofewridge','Furniture','Loafers',1364150,NULL,35763,'Out of Stock',867,'Omnis repellendus. Non enim sit error qui.','Modi aperiam reiciendis. Facilis suscipit laborum et natus sit inventore; voluptatem recusandae ut expedita sapiente dolores libero.','https://www.ngeahiwit.ca/to/outhi.asp','http://letotese.us/terthth/oul/reheruldoul.html','http://atareonher.ae/erereera/tiostesat.html#3032'),(25,'Mictellinphone','Furniture','Accessories',9,NULL,9,'In Stock',6,'Quasi sequi eos amet; omnis aliquid fugiat ut ducimus. Dolorem exercitationem.','Dicta perspiciatis iste consequuntur dicta illo in.','http://www.notedon.uk/es/atisme/henitver/omealbut.htm','http://www.buted.nl/oulhawa/ulderare/ea/hadheor.php?t=91&p=30','http://www.sehad.hu/ionanle/eatifor/tioionbutsho.asp?id=907'),(26,'Cleanculfilet','Furniture','Perfumes',5568200,NULL,10829,'In Stock',64409,'Beatae voluptatem omnis tempore. Est sed neque minus modi!','Inventore natus dicta consequuntur. Et aspernatur libero recusandae et impedit natus. Quasi tenetur voluptates ut laboriosam suscipit aliquam.','http://sees.be/thaisthe/tha/ver/arteeraome.php','https://www.arhiour.gr/athadhe/ones/toedoul/wason.html','http://herit.fr/arleal/haver.php?t=11&p=8286'),(27,'Subpickinentor','Digital','Hand Bags',4818420,NULL,26869,'Out of Stock',8718,'Nisi sit omnis sunt aut. Tenetur nisi officiis. Error voluptas dolore.','Quasi aliquid soluta sit debitis incidunt. Voluptatibus officiis voluptas! Omnis quasi quae. Repellendus in sed; excepturi temporibus quae. Non tenetur qui.','https://anwaallto.ca/hieaen/shoall/areome/alloritthe.php','http://stevene.biz/ereden/ionesin/andalin.asp','https://www.oulthind.kr/hatndle/his/sho/entere.aspx'),(28,'Cartplottentor','Furniture','Single Bags',8530190,NULL,53901,'In Stock',20199,'Iure quo eaque placeat suscipit. Minima minus. Minus rerum doloremque.','Qui iusto aut. Et unde quod. Quis voluptates voluptatem; iusto quasi aut. Dolor consectetur debitis? Ratione possimus aut. Ducimus earum accusantium? Vel.','https://iontetele.at/towa/inonve/butwasbut/ouleveedou.php','https://hameanhi.de/ndhinti/enttiote/erhi/tedthseand.php?t=11&p=4751','http://tiooul.il/anveer/henshooul/as/edenverte.php?t=19&p=384'),(29,'Retaridge','Women','Make Up',9852830,NULL,39713,'Comming Soon',40729,'Quo sed facere molestias dolores. Quas porro. Ut iste. Laboriosam dolorem.','Officia quod porro. Architecto debitis dolore. Omnis qui hic. Exercitationem qui sit. In sed error. Sit placeat fugiat? Porro fuga et. Exercitationem enim.','https://www.asthitiowas.il/is/erthang/eveanent/enattedyou.aspx','http://itneternot.eg/butted/innotsetha.htm','https://www.tihen.se/stwated/atbut/ng/hisshohen.php'),(30,'Tabjecter','Digital','Skin Care',7106440,NULL,4872,'Out of Stock',11,'Quia iure iste et aliquid. Laborum voluptas ut perspiciatis.','Illo natus itaque. Tempora et molestiae accusantium possimus voluptatem magni. Magni velit qui accusamus veritatis minus aut.','http://setedthere.biz/ststth/forhais/iserar/anveorent.asp','https://entasingas.no/st/veralland/eretioher/enyou.php?t=82&p=2693','http://eraheris.cy/ishiner/ndtime/asnotitwa.aspx?id=691'),(31,'Printwoofphone','Furniture','SKirts',3,NULL,3,'Comming Soon',11806,'Est reprehenderit corrupti est numquam.','Est nihil sed tempora. In assumenda sunt! Et aliquam et. Omnis dicta hic repudiandae voluptatem hic qui.','https://ereourhation.es/henedwa/butoul/isandbut/alall.htm','https://www.oulasreat.nl/reerbut/our/eanele/eaerealler.htm','https://www.edometihad.ca/shoyouher/esther/theallre/thlelewas.htm'),(32,'Speaknier','Furniture','Polo T-Shirts',9316640,NULL,38180,'Comming Soon',11628,'Ut est reiciendis tempore unde.','Aliquid quibusdam eveniet temporibus. Excepturi adipisci dolores unde magni cupiditate nulla; error sapiente enim. Accusamus voluptatibus aut rerum ab iste!','https://www.verat.ua/forhatin/vetioteded.php','http://reyouenttio.ua/notntne/hisallisan.php?t=99','https://www.athenhen.cz/ion/aringuld/tedntion/erenoterane.aspx?id=825'),(33,'Tabtecton','Women','Hand Bags',990,NULL,990,'Comming Soon',32453,'Temporibus hic eos in. Non debitis iusto autem necessitatibus. Ad voluptates.','Explicabo tempora quo modi incidunt. Assumenda voluptatem hic tempore et obcaecati. Sint eos earum animi ullam ut. Nulla soluta iste.','http://www.hadent.hu/st/era/in/eabutteeve.asp','https://haalasthi.lu/thha/ome/ntfor/thitedhawit.htm','http://www.thathverhen.il/butforin/hernd/teomemeted.htm'),(34,'Tabcordlet','Men','Sleep Wear',8255100,NULL,17659,'In Stock',23680,'Quisquam porro quasi. Asperiores tempora corrupti quidem omnis...','Officia omnis similique. Culpa eaque suscipit! Doloremque vel perferendis. Adipisci dolores laboriosam. Repellat assumenda et. Dolorem qui et. Architecto.','http://haalterst.ch/onandtio/re/hateden/ithadheed.asp','https://meedverst.mx/was/eayou/seatbutand.php?t=57&p=3591','https://www.orhis.ch/anverare/ere/asherto/wasthsther.htm'),(35,'Monoputgaor','Sports','Sunglases',149950,NULL,51006,'In Stock',25666,'Iusto assumenda officiis autem. Vitae qui voluptatum dolore facere.','Aliquam qui porro error. Velit voluptatem magnam ipsum rerum et commodi. Hic corrupti aperiam laudantium possimus fuga pariatur.','https://www.teuldalour.ar/watedver/thveras/hinesing.asp','http://www.ionngsho.org/edrehis/thaeare/had/ndngmeher.php','http://asvebut.cz/ingatal/re/eratheal/ngallhissho.htm#8906'),(36,'Tweettaor','Furniture','Tablet',2175560,NULL,579,'Comming Soon',896,'Nostrum ratione. Ad iste. Natus dolorem consequatur at. Aut sunt.','Error tenetur perspiciatis. Perspiciatis quidem aspernatur sapiente neque voluptatum aut! Iste dolores sed. In excepturi aut commodi. Debitis et dolores.','http://www.nghiithuld.ar/herhi/ionmethe/entst.asp','https://inverenthi.be/andtone/as/inganted.php?t=98&p=590','http://www.omeheeawas.ua/was/handnd/hen/entedsehin.php?t=27'),(37,'Tabmutinor','Digital','Hand Bags',6697450,NULL,4972,'Out of Stock',22577,'Blanditiis distinctio quia. Molestiae aliquid odit odio qui.','Esse omnis accusantium autem sit quis. Consequatur ea modi ducimus? Veniam quo magnam iusto unde aliquam enim.','https://www.theareternt.at/veralted/notourhadte.php','https://butionhadome.mx/youedyou/al/omeanth.asp?id=12','https://notanshoent.be/at/neonbut/atoulbut/arwithaed.html'),(38,'Recorder','Furniture','Hair Care',9714700,NULL,55183,'In Stock',15350,'Odio est eum. Minus quia! Quis consectetur. In quasi. Et ea!','Facere nam magnam; ut tempora sunt. Deserunt libero omnis; autem aut et. Ut enim et; eius quo voluptas. Magnam quidem et. Eum at cum.','https://inouveryou.com/in/waeraall/hierehin/edeve.asp','http://youtoingter.biz/eve/hatarittio.htm','http://www.hadterti.cy/thiatse/ntnotfor/uldhation/andes.htm'),(39,'Ampceivimscope','Digital','Tablet',601,NULL,601,'In Stock',53662,'Voluptatem ut fugit aliquam. Omnis quas culpa totam corrupti. Sed ut.','Explicabo in laudantium. Et omnis quia? Soluta molestiae rerum! Error debitis minima. Modi voluptate eveniet? Dolores voluptates quaerat! Voluptas earum.','http://edte.ae/le/herwang/allneat/ather.asp?id=36','https://www.tohi.lu/inghadnot/sese/ithtedme/butbutle.htm#238','https://neortesho.il/witenyou/uldngwasas.htm'),(40,'Tweettaar','Women','Wallets & Belts',7194,NULL,7194,'Out of Stock',51498,'Nostrum similique adipisci ullam quidem.','Tempora neque dicta. Unde sed vero. Consequatur eos voluptas. Quo commodi numquam. Unde natus quia. Voluptatibus inventore et! Impedit recusandae at...','https://www.atverandoul.se/tioentuld/teou/ent/forhisthing.htm#16','https://terhadouan.at/herehen/ouhaare/terstsho/allenteraare.asp','http://henng.fr/entheth/areedan/sthaen/forare.asp?id=879'),(41,'Playfindentor','Men','Mobile',9496030,NULL,17120,'Comming Soon',18160,'Labore harum. Quia ipsum suscipit; porro excepturi. Reiciendis quis? Illum.','Atque optio architecto ea aut necessitatibus ducimus. Consequatur magni cupiditate similique quis est et. Laudantium rerum sint omnis aperiam autem aut.','http://www.sesengar.it/terionas/omeeratha/ha/oulishen.asp','http://hadionbutwas.za/wasal/ithorforth.php?t=99&p=6754','http://www.itanforan.at/enandand/atentwas/youareeroul.php'),(42,'Combandedgphone','Kids','Single Bags',37,NULL,37,'Comming Soon',61,'Ut vero voluptates. In ad dolores! Incidunt velit quae; sit distinctio.','Et magnam omnis quas tempora asperiores. Vitae aperiam ut eum; aut temporibus animi omnis et quis quia.','http://seashathin.org/edea/asuldsho/se/nebutveith.htm#97','http://altertith.be/andmein/hineruldng.php','https://www.tibuted.it/notvest/hatver/ion/tedes.htm#955'),(43,'Stereoholdra','Kids','Mobile',12,NULL,12,'Out of Stock',11370,'Omnis voluptates. Esse unde odit et ea.','Mollitia asperiores fuga. Exercitationem adipisci error. Nobis beatae minima. Et fuga nemo. Vitae maxime labore. Qui quidem voluptatem! Aut omnis sed.','http://witar.za/en/enteretha.htm','https://foral.ua/henallha/al/terer/meourteris.htm','http://www.tihadst.za/ter/iswa/lethe/erthiisle.asp'),(44,'Ampcorder','Digital','Travel Bags',7217160,NULL,40461,'Comming Soon',39426,'Doloribus ea aut voluptas aliquam.','Assumenda perspiciatis alias ut quia incidunt facere. Earum odio et est enim unde et.','https://shohadheis.ae/reere/eshadera/toon/tedhi.asp','http://erith.tw/veuldle/heea.asp','http://buterewiteve.ge/eraleent/areasto/rehadhe/tiotedas.htm'),(45,'Renigaer','Furniture','Skin Care',5544820,NULL,15345,'In Stock',36615,'Quis autem voluptate pariatur laudantium.','Sint voluptas aut. Voluptates et voluptatibus. Rerum laboriosam sint; est ad voluptatem. Est nesciunt molestias. Recusandae aut hic! Cupiditate ut eligendi.','http://www.hadhat.tw/not/ar/oranenor.php?t=44','http://www.seand.be/ar/henerasth.php','https://www.newasforare.mx/hadthaeve/anst.php'),(46,'Bitaicer','Digital','Perfumes',5492470,NULL,3316,'Out of Stock',62726,'Numquam qui repellat. Architecto ut unde officiis sint? Omnis sapiente!','Sit porro veniam. Consequatur corporis natus dicta. Aut blanditiis quibusdam est unde corrupti. Illum molestias explicabo est? Saepe et veniam!','http://www.habutereat.cn/ntournot/oningngere.htm','http://www.alheryouit.za/inalthi/atall/orse.asp','http://notverhen.fi/esneter/erehen/hisoul/areitesti.asp?id=514'),(47,'Cleanpickopon','Men','Tops',306,NULL,306,'Comming Soon',11729,'Numquam odit ut sed incidunt.','Omnis aut omnis. Omnis aliquid maiores. Natus fuga aliquid. Et labore accusamus. Qui ut dignissimos? Soluta est enim. Natus quia corporis. Ea voluptate odit.','http://www.areandedhi.kr/onallhat/neheare/seyoushoter.htm#348','https://www.eanduldit.uk/eveere/tedhenasan.asp?id=837','http://www.walever.org/uldnton/inines/eswaas/shoarendat.asp'),(48,'Printleoller','Digital','Hand Bags',7734640,NULL,17005,'Comming Soon',63123,'Quas asperiores voluptatem quia ut.','Quasi unde qui perspiciatis illum facilis quam. Eaque corporis aut tempore culpa sit omnis.','https://omethhisthe.org/inher/butareesen.htm#8','http://thesesith.ca/anngth/notentinome.htm','http://www.teverst.ca/inor/hiithhi/allououltha.aspx'),(49,'Tabculfier','Sports','Perfumes',439,NULL,439,'Comming Soon',62955,'Officiis sit laudantium numquam quas. Dignissimos in reiciendis? Non.','Magni fuga necessitatibus facilis omnis voluptas aperiam. Dicta eum doloremque hic aspernatur. Nostrum nihil aperiam autem; architecto rerum temporibus.','http://www.ithor.au/le/teris/ea/atthayouti.html','http://www.uldwitatat.mx/sho/meing.php','http://eaeveevethi.hu/towaent/allention/aswasera/shoyouingver.aspx'),(50,'Receiver','Digital','Travel Bags',3681770,NULL,51437,'Comming Soon',49086,'Tempora ut et fugiat amet. Temporibus molestiae? Vel qui. Voluptate vel.','Sed sit iste iusto quo qui nam. Ut nobis vel aliquid asperiores adipisci pariatur...','https://anthinot.fr/edatve/isataror.php','https://shoedeveen.uk/ournear/withaon/tewa/hinouarare.htm#3670','https://www.reisat.ca/all/wa/ednd/eveeraionuld.asp');";


    let createUserTableQuery = "CREATE TABLE IF NOT EXISTS `users` (" +
        "  `id` int(11) NOT NULL AUTO_INCREMENT," +
        "  `username` varchar(50) NOT NULL," +
        "  `email` varchar(50) NOT NULL," +
        "  `password` varchar(50) NOT NULL," +
        "  PRIMARY KEY (`id`)" +
        ")";

    let insertDataToUserTable = "INSERT IGNORE INTO `users` VALUES(1,'Arnab','arnab@gmail.com','password');";
    let createRecentlyViewedTableQuery = "CREATE TABLE IF NOT EXISTS `recently_viewed` (" +
        "  `user_id` int(11) NOT NULL, " +
        "  `product_id` int(11) NOT NULL, " +
        "  `last_seen` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
        "  PRIMARY KEY (`user_id`,`product_id`), " +
        "  KEY `user_id` (`user_id`), " +
        "  CONSTRAINT `recently_viewed_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE" +
        ");";
    let createCartTableQuery = "CREATE TABLE IF NOT EXISTS `cart` (" +
        "  `user_id` int(11) NOT NULL," +
        "  `product_id` int(11) NOT NULL," +
        "  `product_count` tinyint(4) NOT NULL," +
        "  KEY `user_id` (`user_id`)," +
        "  KEY `product_id` (`product_id`)," +
        "  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE," +
        "  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE" +
        ");";

    connection.connect(function (err) {
        if (err) {
            console.log("ERROR:", "DB connection error", err.message);
        } else {
            connection.query(query, function (err, result, fields) {
                if (err) {
                    console.log(err.code);
                    console.log(err.sqlMessage);
                }
                //console.log(query);
            });
        }

        connection.query(productInsertQuery, function (err, result, fields) {
            if (err) {
                console.log(err.code);
                console.log(err.sqlMessage);
            }
        });

        connection.query(createUserTableQuery, function (err, result, fields) {
            if (err) {
                console.log(err.code);
                console.log(err.sqlMessage);
            }
        });

        connection.query(insertDataToUserTable, function (err, result, fields) {
            if (err) {
                console.log(err.code);
                console.log(err.sqlMessage);
            }
        });
        connection.query(createCartTableQuery, function (err, result, fields) {
            if (err) {
                console.log(err.code);
                console.log(err.sqlMessage);
            }
        });

        connection.query(createRecentlyViewedTableQuery, function (err, result, fields) {
            if (err) {
                console.log(err.code);
                console.log(err.sqlMessage);
            }
            res.render('index', {title: 'Express'});
        });


    });

});

module.exports = router;
