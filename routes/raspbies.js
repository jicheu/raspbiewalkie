var express = require('express');
var router = express.Router();
var Bies=require('../models/Raspbie');


/* GET raspbies listing. */
router.get('/', function(req, res) {
  var db = req.db;
  var raspbies = db.get('raspbies');
  raspbies.find({},{}, function(e, docs){
    res.render('raspbies', { 
      title: 'RaspbieWalkie',
      ip: global.serverip,
      'raspbies': docs 
    });
  });
});

/* GET new raspbies page. */
router.get('/newraspbie', function(req, res) {
  var dur=req.app.get('duration');
  res.render('newraspbie', { 
    title: 'New Raspbie',
    ip: global.serverip,
    duration: dur
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
  var userName = req.body.username;
  var userTitle = req.body.rasTitle;
  var userRaspbie = req.body.rasPath;
  var raspbies = db.get('raspbies');

  raspbies.insert({
    'username' : userName,
    'rasTitle' : userTitle,
    'rasPath'  : userRaspbie
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
