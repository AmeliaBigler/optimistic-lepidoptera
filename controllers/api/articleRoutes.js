const router = require('express').Router();
const { Article } = require('../../models');

// The `/api/article` endpoint

router.get('/', async (req, res) => {
  // find all articles
  try {
    const articleData = await Article.findAll();
    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single article by its `id`
  try {
    const articleData = await Article.findByPk(req.params.id);

    if (!articleData) {
      res.status(404).json({ message: 'No article found with that id!' });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new article
  /* req.body should look like this...
    {
      "title":"Big News"
      "author_id":""
      "article_body":"Current tech news"
    }
  */
  try {
    const articleData = await Article.create(req.body);
    res.status(200).json(articleData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a article by its `id` value
  /* req.body should look like this...
    {
      "title":"Big News"
      "author_id":""
      "article_body":"Current tech news"
    }
  */
  try {
    const articleData = await Article.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!articleData[0]) {
      res.status(404).json({ message: 'No article with this id!' });
      return;
    }
    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one article by its `id` value
  try {
    const articleData = await Article.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!articleData) {
      res.status(404).json({ message: 'No article found with that id!' });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;