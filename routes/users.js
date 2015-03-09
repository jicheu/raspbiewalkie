var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM users',function(err,rows) {
        if(err)  console.log("Error Selecting : %s ",err );
        res.render('users',{
          title:"Users",
          ip: global.serverip,
          'users':rows
        });
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
  var id = req.params.id;   
  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM users WHERE user_id = ?',[id],function(err,rows) {
        if(err)  console.log("Error Selecting : %s ",err );
          req.getConnection(function(err,connection){
               connection.query('SELECT * FROM raspbies WHERE user_id = ?',[id],function(err,rows2) {
                  if(err)  console.log("Error Selecting : %s ",err );
                  res.render('user',{
                    title:"User detail",
                    ip: global.serverip,
                    'users':rows,
                    'raspbies':rows2});
               });       
            });
        //res.render('users',{title:"Users",'users':rows});
     });       
  });
});

/* POST to add new users to db */
router.post('/', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body)); 
    req.getConnection(function (err, connection) {  
        var data = {       
            username    : input.username,
            firstname : input.firstname,
            lastname  : input.lastname
        };
        
        var query = connection.query("INSERT INTO users set ? ",data, function(err, rows)
        {
          if (err) console.log("Error inserting : %s ",err );
          res.redirect('/users'); 
        });  
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;   
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM users WHERE user_id = ? ",[id], function(err, rows)
        {
             if(err) console.log("Error deleting : %s ",err );
             res.location('/users');
             res.redirect('/users');
        });
        
     });
});

module.exports = router;
