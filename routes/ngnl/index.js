var express = require('express');
var router = express.Router();

var question = require('./quest');
var wiki = require('./wiki');

/* GET home page. */
router.use('/', question);
router.use('/', wiki);

module.exports = router;
