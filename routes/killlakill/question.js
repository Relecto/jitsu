var express = require('express');
var router = express.Router();

questions = [
    {
        picture: "/images/shiro.jpg",
        question: "Где главная героиня аниме (Рюко) нашла свое оружие?",
        variants: [
            "Оно торчало внутри ее отца",
            "Оно было подарено ей ее отцом",
            "Случайно нашла идя по улице ",
            "Не знаю"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: "Фамилия семьи, у которой приютилась Рюко?",
        variants: [
            "Манкансеку",
            "Хабанеро",
            "Шуви",
            "Хирошибо"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: "Как Рюко назвала свою униформу?",
        variants: [
            "Сэнкецу",
            "Дзенкецу",
            "Широбиро",
            "Бадзен"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: "Как звали отряд, который выдвигал сопротивление школе Хоннодзи?",
        variants: [
            "Нудистский Пляж",
            "Этти Хоно",
            "Главное управление Хоннодзи",
            "Школа Оссоки"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: " Каким оружием пользовалась главная героиня?",
        variants: [
            "Гигантской половиной ножниц",
            "Большим копьём",
            "Гигантской Катаной",
            "Пистолет Пулеметом"
        ]
    },
    {
        picture: "/images/soi.jpg",
        question: "Кто изображён на данной картинке?",
        variants: [
            "Санагеяма",
            "Аллукард",
            "Хашираму",
            "Минукаса"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: "По какой причине была создана Академия Ханнодзи?",
        variants: [
            "Чтобы не дать Рюге захватить весь мир",
            "Чтобы захватить всю Японию",
            "Чтобы показать всем свои силы",
            "Просто ,потому что может"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: "В чем заключается основная сила Харимэ?",
        variants: [
            "Она полностью состоит из жизненных нитей",
            "На ней новейшая и сильнейшая униформа",
            "Долгие годы тренировки и подготовки",
            "Знания и вычисление всех данных"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: "Как звали пса семьи Манкансеко?",
        variants: [
            "Гатто",
            "Мойша",
            "Мопс",
            "Гатс"
        ]
    },
    {
        picture: "/images/shiro.jpg",
        question: "По какой причине Кирюен считает всех людей низшими и зависимыми?",
        variants: [
            "Потому что Кирюен шла по стопам своей матери",
            "Потому что у нее было тяжёлое детство",
            "В детстве ее унизили дети",
            "Потому что она имела все, о чем только могла пожелать"
        ]
    },
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
