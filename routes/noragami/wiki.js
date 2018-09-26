var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/wiki', (req, res, next) => {
    res.render('wiki_noragami')
});

module.exports = router;
