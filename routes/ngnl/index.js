var express = require('express');
var router = express.Router();

var question = require('./quest');
var diploma = require('./diploma');

/* GET home page. */
router.use('/', question);
router.use('/diploma', diploma);

module.exports = router;
