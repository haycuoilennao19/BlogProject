var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session')
var flash = require('connect-flash')
var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/article');
var postsRouter = require('./routes/post');
var helmet = require('helmet')
var compression = require('compression')
var https = require('https')
var fs = require('fs')
var http = require('http')
let ejs = require('ejs')
let LRU = require('lru-cache')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
ejs.cache = new LRU(100);
app.use(compression())
app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ketboard cat', cookie: { maxAge: 6000000 }, resave: false, saveUninitialized: false}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session())

app.use('/', indexRouter);
app.use('/article', articlesRouter);
app.use('/post', postsRouter);




mongoose.connect('mongodb+srv://admin:Nhatlk@241095@cluster0-nrygr.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology:
true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.status(404);
  if (req.accepts('html')) {
    res.render('404page', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports = app;