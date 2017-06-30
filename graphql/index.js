'use strict';

const { buildSchema } = require('graphql');
const article = require('./article');

exports.schema = buildSchema(`
  type Query {
    ${article.queries}
  }

  type Mutation {
    ${article.mutations}
  }

  ${article.types}
`);

exports.rootValue = Object.assign({},
  article.rootValue
);
