var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
/**
 * @see https://www.npmjs.com/package/@meanie/mongoose-to-json
 * This plugin will normalize JSON output for client side applications from:

 {
   "_id": "400e8324a71d4410b9dc3980b5f8cdea",
   "__v": 2,
   "name": "Item A"
 }

 * To a cleaner:

 {
   "id": "400e8324a71d4410b9dc3980b5f8cdea",
   "name": "Item A"
 }
 */
const toJson = require('@meanie/mongoose-to-json');
mongoose.plugin(toJson);
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemRouter = require('./routes/item');

var app = express();
app.use(cors());
//connect to Mongodb
mongoose.connect('mongodb://localhost:27017/shoppinglist');

//on connection
mongoose.connection.on('connected', () => {
    console.log("MongoDB connected at port: 27017")
});

//on connection Error
mongoose.connection.on('error', (err) => {
    console.log(err)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/item', itemRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
