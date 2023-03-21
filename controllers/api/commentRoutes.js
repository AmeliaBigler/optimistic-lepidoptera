const router = require('express').Router();
const { Comment } = require('../../models');

// The `/api/comment` endpoint

router.get('/', async (req, res) => {
  // find all comments
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single comment by its `id`
  try {
    const commentData = await Comment.findByPk(req.params.id);

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new comment
  /* req.body should look like this...
    {
      "article_id":"",
      "commenter_id":"",
      "comment_body":"string string string"
    }
  */
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a comment by its `id` value
  /* req.body should look like this...
    {
      "article_id":"",
      "commenter_id":"",
      "comment_body":"This is my opinion on the subject."
    }
  */
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one comment by its `id` value
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;