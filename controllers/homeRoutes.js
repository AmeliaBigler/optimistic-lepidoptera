const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const articles = articleData.map((article) => article.get({ plain: true }));

    // first argument is the handlebars that will be rendered
    // second argument is an object containing what is available to handlebars
    res.render('homepage', {
      articles,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/article/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        },
        {
          model: Comment,
          attributes: ['comment_body', 'date_created'],
          include: [ 
            {
              model: User, 
              attributes: ['name'],
            } 
          ],
        },
      ],
    });
    const article = articleData.get({ plain: true });

    const sessionUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const sessionUser = sessionUserData.get({ plain: true });

    res.render('article', {
      ...article,
      sessionUser,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/updateArticle/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        },
      ],
    });
    const article = articleData.get({ plain: true });

    res.render('article', {
      ...article,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });

    // first argument is the handlebars that will be rendered
    // second argument is an object containing what is available to handlebars
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newArticle', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    // first argument is the handlebars that will be rendered
    // second argument is an object containing what is available to handlebars
    res.render('newArticle', {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;