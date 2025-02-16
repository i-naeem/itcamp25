require('dotenv').config();

const cookieParser = require('cookie-parser');
const configs = require('./lib/configs');
const db = require('./lib/db');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');
const jokesRouter = require('./routes/jokes.route.js');

(async () => {
  await db.connect(configs.MONGODB_URI);
})();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/joke', jokesRouter);

module.exports = app;
