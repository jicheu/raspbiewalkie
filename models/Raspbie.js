
var os=require('os').platform();
var execproc = require('child_process').exec;
var spawnproc = require('child_process').spawn;

var execs=0;


    exports.playBie = function (msg){
      file="audios/"+msg+".wav";
      console.log("playing "+file+" on "+os);
      if (os!="linux") {
        // using sox
        cmd="play"
      } else {
        cmd="aplay"
      }
      
      execs=execproc(cmd+' '+file);
    }

    exports.recordBie = function (msg){
      file="audios/"+msg+".wav";

      console.log("inside recordBie: "+file);
      if (os!="linux") {
        // using sox
        execs=execproc('rec '+file);
      }
      else {
        //execs=execproc('arecord -D plughw:1 --duration='+global.duration+' -f cd -vv '+file);
        execs=spawnproc('arecord', ['-D', 'plughw:1', '--duration='+global.duration, '-f','cd','-vv',file]);

      }

      execs.on('close', function (code, signal) {
        console.log('child process terminated due to receipt of signal '+signal);
        // TODO: convert to mp3 ?
        // TODO: upload to server
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

    exports.stopRecordBie = function (msg){
      console.log("inside stopRecordBie");
      execs.kill('SIGINT');
      var moveme=execproc('mv audios/'+msg.rasPath+msg.username+".wav "+"audios/"+msg._id+".wav");

    }



