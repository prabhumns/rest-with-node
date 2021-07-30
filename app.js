const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const mongoose = require('mongoose');

if (process.env.ENV === 'Test') {
  debug('This is test Environment');
  mongoose.connect('mongodb://localhost:27017/demo-test');
} else {
  debug('This is real environment');
  mongoose.connect('mongodb://localhost:27017/demo');
}

const rootRouter = require('./routes/root');
const Book = require('./models/book');
const bookRouter = require('./routes/books')(Book);

const app = express();
const port = process.env.PORT || 3000;

app.use('/', rootRouter);
app.use('/api/v2', bookRouter);

app.server = app.listen(port, () => {
  debug(`Running on port ${chalk.green(port)}`);
});

module.exports = app;
