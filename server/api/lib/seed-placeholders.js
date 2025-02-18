/**
 * @file seed.js
 * @description This script connects to MongoDB, clears the existing jokes collection,
 * and seeds it with new data from a placeholder file.
 *
 * @author Naeem (@i-naeem)
 * @created 2025-02-17
 * @modified 2025-02-17
 */

require('dotenv').config();

const mongoose = require('mongoose');
const content = require('./placeholder');
const SERVER_CONFIGS = require('./configs');
const Joke = require('../models/Joke.schema');

const seed = async () => {
  try {
    await mongoose.connect(SERVER_CONFIGS.MONGODB_URI);
    console.log('MongoDB connected successfully');

    await Joke.deleteMany({});
    await Joke.insertMany(content);
    console.log('Seed successful');

    mongoose.connection.close();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

seed();
