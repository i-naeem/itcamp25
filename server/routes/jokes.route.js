const formatJokeResponse = require('../middlewares/formatJokeResponse');
const Joke = require('../models/Joke.schema');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const jokes = await Joke.aggregate([{ $sample: { size: 1 } }]);
    if (!jokes.length) {
      return res.status(404).json({ message: 'No jokes found' });
    }

    res.locals.joke = jokes[0];
    next(); 
  } catch (error) {
    next(error);
  }
}, formatJokeResponse);

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const joke = await Joke.findById(id);
    if (!joke) {
      return res.status(404).json({ message: 'No jokes found' });
    }

    res.locals.joke = joke;
    next(); 
  } catch (error) {
    next(error);
  }
}, formatJokeResponse);

router.post('/:id', async (req, res, next) => {
  const { value } = req.body;
  const { id } = req.params;
  const userIp = req.ip; 

  try {
    const joke = await Joke.findById(id);
    if (!joke) {
      return res.status(404).json({ message: 'No joke found' });
    }

    if (!joke.availableVotes.includes(value)) {
      return res.status(400).json({ message: `Invalid vote type: ${value}` });
    }

    const existingVoteIndex = joke.votesList.findIndex(vote => vote.ipAddress === userIp);

    if (existingVoteIndex !== -1) {
      const existingVote = joke.votesList[existingVoteIndex];

      if (existingVote.type === value) {
        joke.votesList.splice(existingVoteIndex, 1);
        const voteToDecrement = joke.votes.find(vote => vote.label === value);
        if (voteToDecrement) voteToDecrement.value -= 1;
      } else {
        const oldVoteType = existingVote.type;
        joke.votesList[existingVoteIndex].type = value;
        joke.votesList[existingVoteIndex].votedAt = new Date();

        const oldVote = joke.votes.find(vote => vote.label === oldVoteType);
        const newVote = joke.votes.find(vote => vote.label === value);
        if (oldVote) oldVote.value -= 1;
        if (newVote) newVote.value += 1;
      }
    } else {
      joke.votesList.push({ ipAddress: userIp, type: value });
      const newVote = joke.votes.find(vote => vote.label === value);
      if (newVote) newVote.value += 1;
    }

    await joke.save();

    res.locals.joke = joke;
    next(); 
  } catch (error) {
    next(error);
  }
}, formatJokeResponse);


module.exports = router;