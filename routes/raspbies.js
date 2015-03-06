var express = require('express');
var router = express.Router();
var Bies=require('../models/Raspbie');


/* GET raspbies listing. */
router.get('/', function(req, res) {
  req.getConnection(function(err,connection){
     connection.query('SELECT raspbies.*, users.username FROM raspbies JOIN users WHERE raspbies.user_id=users.user_id ORDER BY raspbie_id ASC',function(err,rows) {
        if(err)  console.log("Error Selecting : %s ",err );
        res.render('raspbies',{
          title:"Raspbies",   
          ip: global.serverip,
          'raspbies':rows});
      });
  });

/*  var db = req.db;
  var raspbies = db.get('raspbies');

  raspbies.find({},{}, function(e, docs){
    res.render('raspbies', { 
      title: 'RaspbieWalkie',
      ip: global.serverip,
      'raspbies' : docs      
    
    });
  });
*/
});

/* GET new raspbies page. */
router.get('/newraspbie', function(req, res) {

  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM users',function(err,rows) {
        if(err)  console.log("Error Selecting : %s ",err );
        res.render('newraspbie', { 
          title: 'New Raspbie',
          ip: global.serverip,
          duration: req.app.get('duration'),
          'users': rows
        });
      });
  });
  /*var db = req.db;
  var users = db.get('users');
  users.find({},{}, function(e, docs){
      res.render('newraspbie', { 
        title: 'New Raspbie',
        ip: global.serverip,
        duration: req.app.get('duration'),
        'users': docs
      });
    });*/
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;   
  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM users WHERE rasbpie_id = ?',[id],function(err,rows) {
        if(err)  console.log("Error Selecting : %s ",err );
        res.render('raspbies',{title:"Rasbpie",'docs':rows});
     });       
  });
   /* var db=req.db;
    var raspbies=db.get('raspbies');
    raspbies.findOne({_id: req.params.id},function(e,doc) {
        if (doc){
            console.log(doc._id);
            res.json(doc);
        } else {
            console.log('no data');
            res.location('/raspbies');
            res.redirect('/raspbies');
        }
    });*/
});

/* POST to add new raspbies to db */
router.post('/', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body)); 
    var date=new Date();
    req.getConnection(function (err, connection) {  
        var data = {       
            user_id    : input.userid,
            rasTitle : input.rasTitle,
            rasPath  : input.rasPath,
            rasDate  : date
        };
        
        var query = connection.query("INSERT INTO raspbies set ? ",data, function(err, rows)
        {
          if (err) console.log("Error inserting : %s ",err );
          Bies.stopRecordBie(input.rasPath+input.userid,rows.insertId);
          res.location('raspbies');
          res.redirect('raspbies'); 
        });  
    });

 /* var db = req.db;
  var raspbies = db.get('raspbies');
  
  raspbies.insert({
    'userid'   : req.body.userid,
    'rasTitle' : req.body.rasTitle,
    'rasDate'  : Date(),
    'rasPath'  : req.body.rasPath
  }, function (error, doc) {
    if (error) {
      res.send("Could not create new raspbie.");
    } else {
      //console.log("added"+doc.username+" "+doc._id);
      Bies.stopRecordBie(doc);
      res.location('raspbies');
      res.redirect('raspbies');
    }
  });*/
});


router.delete('/:id', function(req, res, next) {
    var id = req.params.id;   
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM raspbies WHERE raspbie_id = ? ",[id], function(err, rows)
        {
             if(err) console.log("Error deleting : %s ",err );
             res.location('/raspbies');
             res.redirect('/raspbies');
        });
        
     });

/*    var db=req.db;
    var raspbies=db.get('raspbies');
    raspbies.findOne({_id: req.params.id},function(e,doc) {
        if (doc){
            console.log("to delete:"+doc._id);
            //raspbies.remove(doc._id) 
            raspbies.remove({ _id : doc._id}, function (err) {
                if(err) return done(err);
              });
        } else {
            console.log('no data');
        }
        //res.method="GET";
        //aspbies.get()
        //res.location('/raspbies');
        //res.redirect('/raspbies');
    });*/
});



module.exports = router;
