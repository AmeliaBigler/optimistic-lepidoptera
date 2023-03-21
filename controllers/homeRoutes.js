const router = require('express').Router();
const { Article } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const articleData = await Article.findAll();

    const articles = articleData.map((project) => project.get({ plain: true }));

    // first argument is the handlebars that will be rendered
    // second argument is an object containing what is available to handlebars
    res.render('homepage', {
      articles,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;