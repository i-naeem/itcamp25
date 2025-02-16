require('dotenv').config();

const mongoose = require('mongoose');
const content = require('./placeholder');
const SERVER_CONFIGS = require('./configs');
const Joke = require('../models/Joke.schema');

mongoose
  .connect(SERVER_CONFIGS.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    seed();
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

const seed = async () => {
  try {
    await Joke.deleteMany({});
    await Joke.insertMany(content);
    console.log('Seed successful');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seed failed:', error);
    mongoose.connection.close();
  }
};
