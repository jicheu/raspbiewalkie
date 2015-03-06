var express = require('express');
var router = express.Router();
var Bies=require('../models/Raspbie');


/* GET raspbies listing. */
router.get('/', function(req, res) {
  var db = req.db;
  var raspbies = db.get('raspbies');

  raspbies.find({},{}, function(e, docs){
    /*db.get('users').options.multi = false;
    var users = db.get('users');
    
    for (thisdoc in docs) {
        //console.log (docs[thisdoc]);
        //console.log (docs[thisdoc].rasPath);
        users.findById ( docs[thisdoc].userid ).on('complete', function (e,doc){ 
          docs[thisdoc].username=doc.username;
          console.log(docs[thisdoc]);
        });
      
        console.log(docs[thisdoc]);

    }   //function (element, index, elements) {
    */
    //console.log(docs[thisdoc]);
    //'raspbies': docs ,
    res.render('raspbies', { 
      title: 'RaspbieWalkie',
      ip: global.serverip,
      'raspbies' : docs      
    
    });
  });
});

/* GET new raspbies page. */
router.get('/newraspbie', function(req, res) {
  var db = req.db;
  var users = db.get('users');
  users.find({},{}, function(e, docs){
      res.render('newraspbie', { 
        title: 'New Raspbie',
        ip: global.serverip,
        duration: req.app.get('duration'),
        'users': docs
      });
    });
});

router.get('/:id', function(req, res, next) {

    var db=req.db;
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
    });
});

/* POST to add new raspbies to db */
router.post('/', function(req, res) {

  var db = req.db;
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
  });
});


router.delete('/:id', function(req, res, next) {

    var db=req.db;
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
    });
});



module.exports = router;
