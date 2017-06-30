'use strict';

const express = require('express');
const articles = require('./routes/articles');

const app = module.exports = express();

app.enable('case sensitive routing');
app.enable('strict routing');
app.disable('x-powered-by');

if (app.get('env') === 'development') {
  app.set('json spaces', 2);
}

app.get('/hello', (req, res) => {
  res.send({ hello: 'world' });
});

app.use(articles);
