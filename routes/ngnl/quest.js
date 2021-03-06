var express = require('express');
var router = express.Router();
var fs = require('fs');

router.use((req, res, next) => {
    req.ngnl = JSON.parse(fs.readFileSync('questions/ngnl.json', 'utf8'));

    next();
});

/* GET home page. */
router.get('/question', function(req, res, next) {
    if (!req.session.questionIndex) {
        req.session.questionIndex = 0
    }
    if (!req.session.score) {
        req.session.score = 0;
    }

    let data = Object.assign(
        {
            total: req.ngnl.length,
            number: req.session.questionIndex + 1
        },
        JSON.parse(JSON.stringify(req.ngnl[req.session.questionIndex])));

    shuffle(data.variants);

    res.render('question',  data);
});

router.get('/answer', (req, res, next) => {
    if (req.query.answer === req.ngnl[req.session.questionIndex].variants[0]) {
        req.session.score++;
    }

    req.session.questionIndex++;

    if (req.session.questionIndex >= req.ngnl.length) {
        res.redirect('results');
        return;
    }

    res.redirect('/ngnl/question');
});

router.get('/results', (req, res, next) => {

    let score = req.session.score;

    delete req.session.score;
    delete req.session.questionIndex;

    res.render('results', {
        title: "ngnl",
        score: score,
        isMax: score >= req.ngnl.length
    })

    //res.send('Your score: ' + score);
});

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = router;
