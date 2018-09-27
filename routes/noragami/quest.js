var express = require('express');
var router = express.Router();
var fs = require('fs');


router.use((req, res, next) => {
    req.questions = JSON.parse(fs.readFileSync('questions/noragami.json', 'utf8'));
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
            total: req.questions.length,
            number: req.session.questionIndex + 1
        },
        JSON.parse(JSON.stringify(req.questions[req.session.questionIndex])));

    shuffle(data.variants);

    res.render('question',  data);
});

router.get('/answer', (req, res, next) => {
    if (req.query.answer === req.questions[req.session.questionIndex].variants[0]) {
        req.session.score++;
    }

    req.session.questionIndex++;

    if (req.session.questionIndex >= req.questions.length) {
        res.redirect('results');
        return;
    }

    res.redirect('/noragami/question');
});

router.get('/results', (req, res, next) => {

    let score = req.session.score;

    delete req.session.score;
    delete req.session.questionIndex;

    res.render('results', {
        title: "noragami",
        score: score,
        isMax: score >= req.questions.length
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
