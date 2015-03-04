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
console.log("running on "+os);

server.listen(3001);

io.on('connection', function(socket){
  console.log('Connected');
  socket.on('play', function(msg){
    console.log('message to play: ' + msg);
    playBie(msg);
  });

  socket.on('stop', function(){
    console.log('need to stop!');
    stopRecordBie();
  });

  socket.on('record', function(msg){
    console.log('message to record: ' + msg);
    recordBie(msg);
  });

  socket.on('disconnect', function(){
    console.log('Disconnected');
  });
});


/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/NodeExpressApp', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TODO : settings DB
app.set('duration',10);


// mongodb setup
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/NodeExpressApp');

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





function playBie(msg){
  file="audios/"+msg+".wav";
  console.log("playing "+file+" on "+os);
  if (os!="linux") {
    console.log("simulating play on "+os);
    return (true);
  }
  execs=execproc('aplay '+file);


}

function recordBie(msg){
  console.log("inside recordBie: "+msg);
  if (os!="linux") {
    console.log("simulating record on "+os);
    execs=execproc('read toto');
  }
  else {
    execs=execproc('arecord -D plughw:1 --duration='+duration+' -f cd -vv '+msg+'.wav');
  }

  execs.on('close', function (code, signal) {
    console.log('child process terminated due to receipt of signal '+signal);
    if (os!="linux") {
      // fake copy for OSX (comment on RPI)
      execs=execproc('cp output.wav audios/'+msg+'_'+Date.now()+'.wav');
    }
    //process.exit();
  });

  execs.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  execs.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  /*process.on('SIGINT', function() {
    console.log('Got SIGINT.  Press Control-D to exit.');
    execs.kill('SIGINT');
  });
  */

}

function stopRecordBie(){
  console.log("inside stopRecordBie"+execs.pid);
  execs.kill('SIGINT');
}

