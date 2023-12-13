const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error conecting to MongoDB', error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

module.exports = app;