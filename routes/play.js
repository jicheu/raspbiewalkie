var express = require('express');
var router = express.Router();


//var mongoose = require('mongoose');
//var Raspbie = require('../models/Raspbie.js');


/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Raspbie.findById(req.params.id, function (err, post) {
    
    console.log("Now playing: "+req.params.id);
    //res.json({"played:":req.params.id});
    res.location('/raspbies');
    res.redirect('/raspbies');

  });
});

module.exports = router;
