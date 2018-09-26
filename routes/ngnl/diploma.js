var express = require('express');
var router = express.Router();

var w = require('wkhtmltopdf');

/* GET home page. */




router.get('/download', (req, res, next) => {
    let diploma = `ngnl_${req.query.who}_${req.query.when}.pdf`;
    console.log(process.cwd());
});

router.use('/', (req, res, next) => {
    res.render('ngnl_diploma', Object.assign(req.query, { layout: false }));
});
module.exports = router;
