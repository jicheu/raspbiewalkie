var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  var db = req.db;
  var users = db.get('users');
  users.find({},{}, function(e, docs){
    res.render('users', { 
      title: 'RaspbieWalkie Users',
      'users': docs 
    });
  });
});

/* GET new users page. */
router.get('/newuser', function(req, res) {
  var dur=req.app.get('duration');
  res.render('newuser', { 
    title: 'New User'
  });

});

router.get('/:id', function(req, res, next) {

    var db=req.db;
    var users=db.get('users');
    users.findOne({_id: req.params.id},function(e,doc) {
        if (doc){
            console.log(doc._id);
            res.json(doc);
        } else {
            console.log('no data');
            res.location('/users');
            res.redirect('/users');
        }
    });
});

/* POST to add new users to db */
router.post('/', function(req, res) {

  var db = req.db;
  var users = db.get('users');
  users.insert({
    'username' : req.body.username,
    'firstname' : req.body.firstname,
    'lastname'  : req.body.lastname
  }, function (error, doc) {
    if (error) {
      res.send("Could not create new user.");
    } else {
      res.location('users');
      res.redirect('users');
    }
  });
});

router.delete('/:id', function(req, res, next) {

    var db=req.db;
    var users=db.get('users');
    var raspbies=db.get('raspbies');
    users.findOne({_id: req.params.id},function(e,doc) {
        if (doc){
            console.log("to delete:"+doc._id);
            //users.remove(doc._id) 
            users.remove({ _id : doc._id}, function (err) {
                if(err) return done(err);
                raspbies.findById({ userid: doc._id }, function (err, ras) {
                      console.log ("to delete in the future: " + ras);
                });
              });
        } else {
            console.log('no data');
        }
        res.location('/users');
        res.redirect('/users');
        
    });
});

module.exports = router;
