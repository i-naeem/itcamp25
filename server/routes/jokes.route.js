const Joke = require('../models/Joke.schema');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const jokes = await Joke.aggregate([{ $sample: { size: 1 } }]);
    if (!jokes.length) {
      return res.status(404).json({ message: 'No jokes found' });
    }
    return res.json(jokes[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
