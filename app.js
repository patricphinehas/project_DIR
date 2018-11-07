var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regRouter = require('./routes/reg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var mysql = require('mysql');
var sqlstring =require('sqlstring');
var con = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'sharmi'
});

con.query('use hospitalrecord',function(err,res){
  if(err) throw err;
  else
    console.log('the database is present and can be accessed successfully');
});




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reg', regRouter);




module.exports = app;
