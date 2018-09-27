var express = require('express');
var router = express.Router();
/* GET home page. */

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


router.use('/diploma', (req, res, next) => {
    req.query.uuid = makeid();
    let d = new Date();
    req.query.when = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

    res.render('diploma_noragami', Object.assign(req.query, { layout: false }));
});

module.exports = router;
