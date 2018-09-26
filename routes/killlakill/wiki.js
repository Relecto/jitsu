var express = require('express');
var router = express.Router();

var question = require('../ngnl/quest');

/* GET home page. */
router.get('/wiki', (req, res, next) => {
    res.render('wiki_killlakill')
});

module.exports = router;
