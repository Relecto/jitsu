var express = require('express');
var router = express.Router();

var question = require('./quest');

/* GET home page. */
router.use('/', question);

module.exports = router;
