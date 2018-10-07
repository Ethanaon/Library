var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var compression = require('compression');
var helmet = require('helmet');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog'); //Import routes for "catalog" area of site

//load all specific params fr the applicaton in file confi/.env
const config = require('dotenv').config({path: path.join(__dirname, '/config/.env')})
if (config.error) {
  throw config.error
}
console.log(config.parsed)

var app = express();

app.use(helmet());

// parameter to acces the databas are defined in the config/.env files
var dbServer = process.env.dbServer;
var dbName = process.env.dbName;
var dbPort = process.env.dbPort;
var dBUser = process.env.dbUser;
var dbPass = process.env.dbPassword;


//Set up mongoose connection
//var mongoDbUrl = 'mongodb://' + dBUser + ':' + dbPass + '@' + dbServer + ':' + dbPort + '/' + dbName ;
var mongoDbUrl = 'mongodb://' + dbServer + ':' + dbPort + '/' + dbName;

const dbOptions = {
  useNewUrlParser: true,
  dbName: dbName, 
  user: dBUser, 
  pass: dbPass
};
var mongoose = require('mongoose');
mongoose.connect(mongoDbUrl, dbOptions);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error : ' + mongoDbUrl));
//console.log('connected to the DB : ' + mongoDbUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression()); //Compress all routes

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/BTB.ico')); // Active la favicon indiquée

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

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
