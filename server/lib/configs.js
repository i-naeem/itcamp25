let SERVER_CONFIGS = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/itcamp25',

  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:8080',
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
};

module.exports = SERVER_CONFIGS;
