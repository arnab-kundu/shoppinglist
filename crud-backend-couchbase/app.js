var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var itemRouter = require('./routes/item');
var productRouter = require('./routes/product');
var recentlyViewedRouter = require('./routes/recently_viewd');
var cartRouter = require('./routes/cart');
var wishListRouter = require('./routes/wishlist');
var accountRouter = require('./routes/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api/item', itemRouter);
app.use('/api/product', productRouter);
app.use('/api/recently_viewed', recentlyViewedRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishListRouter);
app.use('/api/account', accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
