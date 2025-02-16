const mongoose = require('mongoose');

const connect = async (DB_URI) => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

module.exports = { connect };
