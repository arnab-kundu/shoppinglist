# MongoDB commends

## 1 - Introduction to MongoDB + Installing MongoDB

https://www.mongodb.com/try/download/community?tck=docs_server
https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.1-signed.msi  
Open cmd in this path -> `C:\Program Files\MongoDB\Server\4.4\bin`. Then excute below commends to launch mondodb shell.
```shell
> mongod
> mongo
```
## Mongodb Shell tips
1. select text hit enter to copy
2. and right click to paste

| mongodb   | MySQL     |
|-----------|-----------|
| db        | Database  |
| collection| Table     |
| Document  | Row       |

## 2. MongoDB GUI Tools
There are many GUI tools for mongodb available in market. But unluckily we don't have any open source GUI tool for mongodb as of now.
1. Studio 3T (Paid)
2. nosqlbooster4mongo-5.2.9 (Paid)\
Features:
    1. Can generate dummy data.
3. [DataGrip](https://www.jetbrains.com/datagrip/download/#section=windows) (30-days free trial)

## 3. Create Database and Drop Database
```shell
show dbs
use <database name>
db.dropDatabase()

show collections
db.<collection name>.find()
db.<collection name>.find().pretty()
```

## 4. Create Collection and Drop Collection
```shell
db.createCollection('<collection name>')
db.createCollection('<collection name>',Option)
db.<collection name>.drop()
```
### 4.1 Create Index
```shell
db.collection.createIndex( <key and index type specification>, { unique: true } )
db.users.createIndex( { "email": 1 }, { unique: true } )
```
## 5. Insert Documents
```shell
db.<collection name>.insert(<JSON Object/ JSON Array>)
db.<collection name>.insert( { "name" : "Max" } )
db.employee.insert({"name":"Max", "gender":"M"})
db.emp.save({"name":"Max","lastname":"Doe","Rank":1})
db.emp.save([
	{ "name" : "Max", "lastname" : "Doe", "Rank" : 1 },
	{ "name" : "Jhon", "lastname" : "Doe", "Rank" : 2 },
	{ "name" : "Anna", "lastname" : "Doe", "Rank" : 3 },
	{ "name" : "Harry", "lastname" : "Doe", "Rank" : 4 }
])
```
> ~~`insert()`~~ and ~~`save()`~~ is deprecated and should be replaced by `insertOne()` and `insertMany()`

## 6. Query Document
```shell
db.emp.find()
db.emp.find().pretty()
db.emp.findOne()
db.emp.find({"Rank":0})
db.emp.find({"Rank":1})
db.emp.find({"Rank":{$gt : 2}})
db.emp.find({"Rank":{$gte : 2}})
db.emp.find({"Rank":{$lt : 2}})
db.emp.find({"Rank":{$lte : 2}})
db.emp.find({"Rank":{$ne : 2}})
db.emp.find({"Rank":{$ne : 2}}).pretty()
db.users.find({"name": /.*m.*/})
db.users.find({"name": /m/})
db.users.find({"name": /^m/})
```

## 7. Query Document - AND OR Conditions
```shell
db.emp.find({"name":"Max","Rank":1})
db.emp.find({$or:[{"name":"Max"},{"Rank":2}]})
db.emp.find({$or:[{"name":"Max"},{"name":"Jhon"}]})
db.emp.find({$or:[{"name":"Max"},{"lastname":"Doe"}]})
db.emp.find({$or:[{"name":"Max"},{"name":/ab/}]})
db.emp.find( { "name":"Max" , $or:[ {"Rank": 1}, {"Rank":2 } ]})
db.emp.find( { "name":"Jhon" , $or:[ {"Rank": 1}, {"Rank":2 } ]})
db.emp.find( { "name":"Anna" , $or:[ {"Rank": 1}, {"Rank":3 } ]})
```

## 8. MongoDB Update Document
```shell
db.emp.update({"_id" : ObjectId("5f8fd51c5ce387746c43ba63")},{$set: {"name":"Jhon","lastname":"Doe"}})
db.emp.update({"lastname":"Doe"},{$set: {"lastname":"Doe"}},{multi:true})
db.emp.save({ "_id" : ObjectId("5f8fd51c5ce387746c43ba63"), "name" : "Jhon", "lastname" : "Doe", "Rank" : 2 })
```
> Note: ~~`update()`~~ & ~~`save()`~~ is deprecated and should be replaced by `updateOne()` and `updateMany()`
```shell
db.products.updateOne({_id : ObjectId('5ff891d75746cd49206d2105')},{$set: {image_url:'https://i.pinimg.com/474x/57/f4/e5/57f4e587332456b10876f5f07fdeecff.jpg'}})
db.products.updateOne({_id : ObjectId('5ff891d75746cd49206d2105')},{$set: {name:'Wooden Chair'}})
db.recently_viewed.updateMany({},{$set :{user_id:'0'}}) //Update all without any where clause
```
## 9. MongoDB Delete Document
```shell
db.emp.remove({"Rank":4})
db.emp.remove({"lastname":"Doe"})
db.emp.remove({"lastname":"Doe"},1)
```
> Note: ~~`remove()`~~ is deprecated and should be replaced by `deleteOne()` & `deleteMany()`
```shell
db.products.deleteOne({price:7194})
db.products.deleteMany({price:{$gt : 100000}})
```
## 10. MongoDB Projection
```shell
db.emp.find({},{"name":1})
db.emp.find({},{"name":1,"_id":0})
```

## 11. Using Sort, Skip, and Limit in MongoDB
```shell
db.emp.find().limit(2)
db.emp.find().skip(1)
db.emp.find().skip(1).limit(2)
db.emp.find().sort({"Rank":1})
db.emp.find().sort({"Rank":-1})
db.emp.find().sort({"name":1})
```

## 12. MongoDB Indexing
```shell
use temp
for(i=0;i<10000000; ++i){
    db.posts.insert({"student_id": i, "name" : "Mark"});
}
go to cmd
db.posts.find()
db.posts.find({"student_id" : 1000});
db.posts.findOne({"student_id" : 1000});

db.posts.ensureIndex({"student_id" : 1});
db.posts.find({"student_id" : 100000});

db.posts.dropIndex({"student_id" : 1});
db.posts.find({"student_id" : 100000});
```

## 13. MongoDB Aggregation
```shell
db.emp.aggregate([{ $group : {_id : "$lastname", Count : {$sum:1} } }])
```

## 14. MongoDB BackUp and Restore
Open cmd as admin then move to
```shell
> cd C:\Program Files\MongoDB\Server\4.2\bin
```
* mongodump -> will create dump folder in the same location
* mongorestore -> will restore all dump database from dump folder
```shell
mongodump --db mydb
use mydb
db.dropDatabase()
show dbs
mongorestore --db mydb dump/mydb
show dbs
```

## Backup and Restore Collection
```shell
mongodump --db <database name> --collection <collection name>
use <database name>
db.<collection name>.drop()
mongorestore -db <database name> --collcetion <collection name> dump/<database name>/collection name>.bson
```
**Note: Backup restore working in monogodb version 4.2 but not working in 4.4.1**

## To check db version
```shell
db.version()
```
# Node Mongodb development
## Json to String conversion and vise-versa
```
var myJson = {name:'Max', age:23};
var resultJson = JSON.stringify(myJson);
console.log(resultJson);
console.log(JSON.parse(resultJson));
```