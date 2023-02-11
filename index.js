var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const cors = require('cors');
const rateLimit = require('express-rate-limit')

// *** Main Page***
var indexRouter = require('./src/routes/index')

//**GreenStoreApi
var indexGreenStoreRouter = require('./src/routes/greenStoreApi/index');

//**OKR Api
var okrIndexRouter = require('./src/routes/okr/index');

//**Game 
var GameRouter = require('./src/routes/game/games')

//Tarot Api
var tarotRouter = require('./src/routes/tarot')

// Schedule 
var scheduleRouter = require('./src/routes/schedule')

// BingoGame
var bingoGameRouter = require('./src/routes/bingoGame')

var app = express();

require('dotenv').config()
require('./src/dbconnect')

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('nobita'));
app.use(session({
  secret: 'lunar',
  saveUninitialized: true,
  resave: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/storage',express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use((req,res, next)=>{
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 1000, 
	standardHeaders: true, 
	legacyHeaders: false,
})

app.use(limiter)
//main routes
app.use('/', indexRouter);

// greenstore routes
app.use('/greenstore',indexGreenStoreRouter);


// okr routes
app.use('/okr',okrIndexRouter);

// game routes
app.use('/game',GameRouter)

//tarot routes
app.use('/tarot',tarotRouter)

// schedule routes
app.use('/schedule',scheduleRouter)

// schedule routes
app.use('/bingoGame',bingoGameRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.render('error')
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

// these cover below code can be remove after run production (because port have been used in ./bin/www)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// 

module.exports = app;
