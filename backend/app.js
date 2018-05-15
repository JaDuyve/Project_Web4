var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
let passport = require('passport');

mongoose.connect(process.env.STUDYBUDY_DATABASE || 'mongodb://localhost/studybuddb');
require('./models/Comment');
require('./models/Question');
require('./models/User');
require('./models/Group');
require('./models/Message');
require('./models/Chatroom');

require('./config/passport');

var index = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/group');
var chats = require('./routes/chat');



var app = express();

let cors = require('cors');
app.use(cors({origin: '*'}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//create a cors middleware
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });

app.use('/', index);
app.use('/API/users', users);
app.use('/API/groups', groups);
app.use('/API/chats', chats);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
