let SERVER_CONFIGS = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/itcamp25',
};

module.exports = SERVER_CONFIGS;
