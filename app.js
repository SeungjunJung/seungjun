var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//logger 설정
// var logger=require('./logger');

// logger.debug('debug1');
// logger.verbose('verbose1');
// logger.info('info1');
// logger.warn('warn1');
// logger.error('error1');
/*
/home

1. /home
    - /home/movies (GET)
    - /home/shopping/:type (GET)
    - /home/shipping (POST)
2. /home/mypage
    - /home/mypage (POST)
    - /home/mypage/qna (POST)
3. /home/mypage/basket
    - /home/mypage/basket (POST)
    - /home/mypage/basket/purchase (POST)
    - /home/mypage/basket/delete (POST)
    - /home/mypage/basket/update (POST)

4. /home/mypage/like
    - /home/mypage/like/movie (POST)
    - /home/mypage/like/shopping (POST)

5. /home/search/items/search
    - /home/search/items/search/hit (POST)
    - /home/search/items/search/like (POST)

6. /home/search/movies/search
    - /home/search/movies/search/hit (POST)
    - /home/search/movies/search/like (POST)

7. /home/search/first
    - /home/search/first/movie/like (GET)
    - /home/search/first/shopping/like (GET)
*/

app.use('/home', require('./routes/home'));

/*
/review

1. /review/delete
    - /review/delete (POST)
*/

app.use('/review', require('./routes/review'));

/*
/movie

1. /movie/info
    - /movie/info/:movie_id (GET)
    - /movie/info (POST)
    - /movie/info/like (POST)
    - /movie/info/unlike (POST)
    - /movie/player/:movie_id (GET)
*/

app.use('/movie', require('./routes/movie'));

/*
/shopping

1. /shopping/info
    - /shopping/info/like (POST)
    - /shopping/info/unlike (POST)
    - /shopping/info/purchase (POST)

2. /shopping/info/items
    - /shopping/info/items/:item_id (GET)
    - /shopping/info/items (POST)

3. /shopping/info/review
    - /shopping/info/review/:item_id (GET)
    - /shopping/info/review/write (POST)

4. /shopping/info/basket
    - /shopping/info/basket (POST)
*/

app.use('/shopping', require('./routes/shopping'));

/*
/purchase

1. /purchase/finalpay
    - /purchase/finalpay (POST)
*/

app.use('/purchase', require('./routes/purchase'));

/*

/shipping
1. /shipping/detail/:purchase_id
    - /shipping/detail/:purchase_id (GET)

*/

app.use('/order', require('./routes/order'));

app.use('/user', require('./routes/user'));

/*

/user
1. /user/login
    -/user/login (POST)
2. user/logout
    -/user/logout(GET)
*/

app.use('/admin', require('./routes/admin'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function(){
  console.log("Server Start!!");
});

module.exports = app;
