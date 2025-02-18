/**
 * @file jokes.route.js
 * @description Route handlers for managing jokes. This includes fetching a random joke,
 * fetching a joke by ID, and handling voting on jokes.
 *
 * @author Naeem (@i-naeem)
 * @created 2025-02-17
 * @modified 2025-02-17
 */

const express = require('express');
const Joke = require('../models/Joke.schema');
const formatJokeResponse = require('../middlewares/formatJokeResponse');
const router = express.Router();

/**
 * Helper function to fetch a joke by ID and handle errors
 * @param {string} id - The joke's ID
 * @param {Object} res - The response object
 * @returns {Promise<Object>} The found joke
 */
const getJokeById = async (id, res) => {
  const joke = await Joke.findById(id);
  if (!joke) {
    res.status(404).json({ message: 'No joke found' });
    return null;
  }
  return joke;
};

/**
 * GET / - Get a random joke
 */
router.get(
  '/',
  async (req, res, next) => {
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
  },
  formatJokeResponse,
);

/**
 * GET /:id - Get a joke by its ID
 */
router.get(
  '/:id',
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const joke = await getJokeById(id, res);
      if (!joke) return; // Exit if joke is not found

      res.locals.joke = joke;
      next();
    } catch (error) {
      next(error);
    }
  },
  formatJokeResponse,
);

/**
 * POST /:id - Vote on a joke (Users can vote for multiple reactions, but only once per reaction)
 */
router.post(
  '/:id',
  async (req, res, next) => {
    const { value } = req.body;
    const { id } = req.params;
    const userIp = req.ip;

    try {
      const joke = await getJokeById(id, res);
      if (!joke) return;

      if (!joke.availableVotes.includes(value)) {
        return res.status(400).json({ message: `Invalid vote type: ${value}` });
      }

      const userVotes = joke.votesList.filter((vote) => vote.ipAddress === userIp);
      const hasVotedForThisType = userVotes.some((vote) => vote.type === value);

      if (hasVotedForThisType) {
        joke.votesList = joke.votesList.filter((vote) => !(vote.ipAddress === userIp && vote.type === value));

        const voteToDecrement = joke.votes.find((vote) => vote.label === value);
        if (voteToDecrement) voteToDecrement.value -= 1;
      } else {
        joke.votesList.push({ ipAddress: userIp, type: value });
        const newVote = joke.votes.find((vote) => vote.label === value);
        if (newVote) newVote.value += 1;
      }

      await joke.save();

      res.locals.joke = joke;
      next();
    } catch (error) {
      next(error);
    }
  },
  formatJokeResponse,
);

/**
 * PUT /:id - Update a joke's question or answer
 */
router.put(
  '/:id',
  async (req, res, next) => {
    const { question, answer } = req.body;

    if (!question && !answer) {
      return res.status(400).json({ message: 'At least one field (question or answer) is required' });
    }

    try {
      const joke = await getJokeById(req.params.id, res);
      if (!joke) return; // Exit if joke is not found

      if (question) joke.question = question;
      if (answer) joke.answer = answer;

      await joke.save();
      res.locals.joke = joke;
      next();
    } catch (error) {
      next(error);
    }
  },
  formatJokeResponse,
);

/**
 * DELETE /:id - Delete a joke by its ID
 *
 * This route will only perform an actual deletion if the total number of jokes is greater than 10.
 * If there are 10 or fewer jokes, the response will simulate a deletion by returning a success message
 * without removing the joke. This is to ensure that a minimum number of jokes (10) is maintained in the database.
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const totalJokes = await Joke.countDocuments();
    const joke = await getJokeById(req.params.id, res);
    if (!joke) return;

    if (totalJokes > 10) {
      await joke.deleteOne();
      res.status(200).json({ message: 'Joke deleted successfully' });
    } else {
      res.status(200).json({
        message: 'Joke deletion simulated. Joke was not removed to maintain a minimum count of 10 jokes.',
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
