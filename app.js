'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./graphql');

const app = module.exports = express();
const developmentMode = app.get('env') === 'development';

app.enable('case sensitive routing');
app.enable('strict routing');
app.disable('x-powered-by');

if (developmentMode) {
  app.set('json spaces', 2);
}

app.get('/hello', (req, res) => {
  res.send({ hello: 'world' });
});

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: developmentMode,
  pretty: developmentMode,
}));
