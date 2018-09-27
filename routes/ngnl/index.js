var express = require('express');
var router = express.Router();

var question = require('./quest');
var wiki = require('./wiki');
var diploma = require('./diploma');

/* GET home page. */
router.use('/', question);
router.use('/', wiki);
router.use('/', diploma);

module.exports = router;
