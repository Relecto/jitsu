var express = require('express');
var router = express.Router();

questions = [
    {
        picture: "/images/shiro.jpg",
        question: "Кто изображен на картинке?",
        variants: [
            "Широ",
            "Стефф",
            "Шуви",
            "Джибрил"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: "Кто изображен на картинке?",
        variants: [
            "Широ",
            "Стефф",
            "Шуви",
            "Джибрил"
        ]
    }
];

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
            total: questions.length,
            number: req.session.questionIndex + 1
        },
        JSON.parse(JSON.stringify(questions[req.session.questionIndex])));

    shuffle(data.variants);

    res.render('question',  data);
});

router.get('/answer', (req, res, next) => {
    if (req.query.answer === questions[req.session.questionIndex].variants[0]) {
        req.session.score++;
    }

    req.session.questionIndex++;

    if (req.session.questionIndex >= questions.length) {
        res.redirect('results');
        return;
    }

    res.redirect('question');
});

router.get('/results', (req, res, next) => {

    let score = req.session.score;

    delete req.session.score;
    delete req.session.questionIndex;

    res.send('Your score: ' + score);
});

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = router;
