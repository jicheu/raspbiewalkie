var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var raspbies = require('./routes/raspbies');
var play = require('./routes/play');

var execproc = require('child_process').exec;

var execs=0;

var server = require('http').Server(app);
var io = require('socket.io')(server);
var os=require('os').platform();

global.duration=10;
// TODO: is there a better way? Otherwise, we can't connect to the interface remotely...
// TODO: test if no wlan,use localhost at least

if (os=="linux") {
    if (require('os').networkInterfaces()['wlan0']) {
      global.serverip=require('os').networkInterfaces()['wlan0'][0]['address'];
    } 
    else if (require('os').networkInterfaces()['eth0']) {
      global.serverip=require('os').networkInterfaces()['eth0'][0]['address'];
    } 
    else {
      global.serverip="127.0.0.1";
    } 
    
} else if (os=="darwin") {
  if (require('os').networkInterfaces()['en0']) {
    global.serverip=require('os').networkInterfaces()['en0'][1]['address'];
  } else {
    global.serverip="127.0.0.1";
  }
}

console.log(global.serverip);

var Bies=require('./models/Raspbie.js');


//var io2=require('socket.io-client');
//io2=io2.connect('http://localhost:3010');
//io2.emit("hello","hello");

console.log("running on "+os);

io.on('connection', function(socket){
  console.log('Connected');
  socket.on('play', function(msg){
    console.log('message to play: ' + msg);
    Bies.playBie(msg);
  });

  socket.on('stop', function(){
    console.log('need to stop!');
    Bies.stopRecordBie('from1');
  });

  socket.on('record', function(msg){
    console.log('message to record: ' + msg);
    Bies.recordBie(msg);
  });

  socket.on('disconnect', function(){
    console.log('Disconnected');
  });
});

server.listen(3001, function(){
  console.log('listening on *:3001');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TODO : settings DB
app.set('duration',global.duration);


// mongodb setup
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/Raspbies');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// makes db accessible to router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// establishes middleware for express
app.use('/', routes);
app.use('/raspbies', raspbies);
app.use('/play', play);

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


module.exports = app;


