var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const cors = require('cors');
const rateLimit = require('express-rate-limit')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var ratingRouter = require('./routes/rating')
var categoryRouter = require('./routes/category')
var carouselRouter = require('./routes/carousel')
var cartRouter = require('./routes/cart')
var orderRouter = require('./routes/order')
var taskRouter = require('./routes/task');

var app = express();

require('dotenv').config()
require('./dbconnect')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('nobita'));
app.use(session());
app.use('/storage',express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use((req,res, next)=>{
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 50, 
	standardHeaders: true, 
	legacyHeaders: false,
})

app.use(limiter)
app.use('/', indexRouter);
app.use('/products',productRouter)
app.use('/rating', ratingRouter);
app.use('/category', categoryRouter);
app.use('/carousel',carouselRouter)
app.use('/cart',cartRouter)
app.use('/order', orderRouter)
app.use('/user', usersRouter);
app.use('/task',taskRouter)



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
