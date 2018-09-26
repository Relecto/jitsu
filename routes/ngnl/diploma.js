var express = require('express');
var router = express.Router();
/* GET home page. */

router.use('/diploma', (req, res, next) => {
    res.render('diploma_ngnl', Object.assign(req.query, { layout: false }));
});

module.exports = router;
