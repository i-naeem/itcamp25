/**
 * @file configs.js
 * @description This file contains the configuration settings for the server, including
 * the database connection URI, CORS configuration, environment settings, and server port.
 * The configurations are populated from environment variables, or fallback to default values.
 *
 * This file centralizes key configuration settings needed for the server's operation, which can be
 * modified as per the deployment environment. Sensitive information like database credentials
 * should be managed through environment variables for better security.
 *
 * @author Naeem (@i-naeem)
 * @modified 2025-02-17
 */

let SERVER_CONFIGS = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/itcamp25',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:8080',
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
};

module.exports = SERVER_CONFIGS;
