var express = require('express');
var router = express.Router();
var Bies=require('../models/Raspbie');


/* GET raspbies listing. */
router.get('/', function(req, res) {
  var db = req.db;
  var raspbies = db.get('raspbies');

  var users = db.get('users');

  raspbies.find({},{}, function(e, docs){
//    var user= users.findOne({_id: '54f971cdbddc6c6069b8c4d4'});

    //'raspbies': docs ,
    res.render('raspbies', { 
      title: 'RaspbieWalkie',
      ip: global.serverip,
      'raspbies' : { docs.}      
    
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

module.exports = router;
