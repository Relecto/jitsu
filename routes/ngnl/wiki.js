var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/wiki', (req, res, next) => {
    res.render('wiki_ngnl')
});

module.exports = router;
