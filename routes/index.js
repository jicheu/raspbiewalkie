var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//var util = require('util');
	//console.log(util.inspect(req.query, {showHidden: false, depth: null})); 
  res.render('index', { 
  	title: 'Raspbie Walkie',
  	author: 'JC' 
  });
});

module.exports = router;
