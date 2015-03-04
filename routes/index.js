var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Raspbie Walkie',
  	author: 'JC' 
  });
});

module.exports = router;
