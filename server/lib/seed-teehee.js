/**
 * @file seedTeeHee.js
 * @description This script connects to MongoDB, fetches 50 unique jokes from the TeeHee API using Node's built-in fetch,
 * and seeds them into the database while ensuring no duplicate jokes are added.
 *
 * Note: Requires Node.js v18 or later.
 *
 * @author Naeem
 * @created 2025-02-19
 */

require('dotenv').config();
const mongoose = require('mongoose');
const SERVER_CONFIGS = require('./configs');
const Joke = require('../models/Joke.schema');

const API_URL = 'https://teehee.dev/api/joke';
const TOTAL_JOKES = 50;

/**
 * Generates random vote counts for the three vote types.
 * @returns {Array} An array of vote objects with random values.
 */
const generateRandomVotes = () => [
  { value: Math.floor(Math.random() * 100), label: 'like', active: false },
  { value: Math.floor(Math.random() * 100), label: 'love', active: false },
  { value: Math.floor(Math.random() * 100), label: 'laugh', active: false },
];

/**
 * Fetches a unique joke from the TeeHee API using Node's built-in fetch.
 * @param {Set} existingIds - Set of joke IDs already added.
 * @returns {Promise<Object|null>} A joke object or null if duplicate.
 */
const fetchUniqueJoke = async (existingIds) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }
    const { id, question, answer } = await response.json();

    if (!id || existingIds.has(id)) {
      return null; // Skip duplicate jokes
    }

    existingIds.add(id);
    return { id, question, answer, votes: generateRandomVotes(), availableVotes: ['like', 'love', 'laugh'] };
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    return null;
  }
};

/**
 * Seeds the database with unique jokes from the TeeHee API.
 */
const seedDatabase = async () => {
  try {
    await mongoose.connect(SERVER_CONFIGS.MONGODB_URI);
    console.log('MongoDB connected successfully');

    await Joke.deleteMany({});
    console.log('Existing jokes cleared');

    const existingIds = new Set();
    const jokes = [];

    while (jokes.length < TOTAL_JOKES) {
      const joke = await fetchUniqueJoke(existingIds);
      if (joke) {
        jokes.push(joke);
        console.log(`Fetched joke ${jokes.length}: ${joke.question}`);
      }
    }

    await Joke.insertMany(jokes);
    console.log(`Successfully seeded ${jokes.length} jokes!`);
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
seedDatabase();
