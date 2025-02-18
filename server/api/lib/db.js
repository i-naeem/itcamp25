/**
 * @file db.js
 * @description Database connection logic using Mongoose. This module exports a function
 * to establish a connection to the MongoDB database. The connection URI is passed as an argument
 * to the connect function. On success, a success message is logged, and on failure, an error is logged.
 *
 * @author Naeem (@i-naeem)
 * @created 2025-02-17
 * @modified 2025-02-17
 */

const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database.
 * @param {string} DB_URI - The MongoDB connection URI.
 * @returns {void}
 */
const connect = async (DB_URI) => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

module.exports = { connect };
