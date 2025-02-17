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


router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const joke =  await Joke.findById(id);
    if (!joke) {
      return res.status(404).json({ message: 'No jokes found' });
    }
    return res.json(joke);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { action, value } = req.body;
  const { id } = req.params;

  try {
    const joke = await Joke.findById(id);
    if (!joke) {
      return res.status(404).json({ message: 'No jokes found' });
    }

    if (action !== 'increment' && action !== 'decrement') {
      return res.status(400).json({ message: 'Invalid action. Use "increment" or "decrement".' });
    }

    const vote = joke.votes.find((vote) => vote.label === value);
    if (!vote) {
      return res.status(400).json({ message: `Invalid vote label: ${value}` });
    }

    if (action === 'increment') {
      vote.value += 1;
    } else if (action === 'decrement') {
      vote.value -= 1;
    }

    await joke.save();

    return res.json(joke); 
  } catch (error) {
    next(error);
  }
});


module.exports = router;
