var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var mailRouter = require('./routes/mail');
var usersRouter = require('./routes/users');
//var inboxRouter = require('./routes/inbox');

var app = express();

mongoose.connect(
  "mongodb+srv://node-cipher-user:node-cipher-user@node-cipher-if2xf.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true 
  }
);
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes which handle requests
app.use('/mail', mailRouter);
app.use('/users', usersRouter);
//app.use('/inbox', inboxRouter);

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