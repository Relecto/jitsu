var express = require('express');
var router = express.Router();
/* GET home page. */

router.use('/', (req, res, next) => {
    res.render('ngnl_diploma', Object.assign(req.query, { layout: false }));
});

module.exports = router;
