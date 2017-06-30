# Step 4: GraphQL

## Install packages

```sh
npm i graphql express-graphql
```

## Update tests

```js
it('lists articles', () => request(app)
  .post('/graphql')
  .send({
    query: `
      {
        listArticles {
          slug,
          title,
          body,
        }
      }
    `,
  })
  .expect(200)
  .expect(res => res.body.data.listArticles.forEach(article => {
    assert.equal(typeof article.slug, 'string');
    assert.equal(typeof article.title, 'string');
    assert.equal(typeof article.body, 'string');
  }))
);
```

## Article schema

```js
exports.types = `
  type Article {
    slug: String!,
    title: String!,
    body: String!,
  }
`;

exports.queries = `
  listArticles: [Article],
  getArticle(slug: String!): Article,
`;

exports.mutations = `
  createArticle(title: String!, body: String!): Article,
  updateArticle(slug: String!, title: String!, body: String!): Article,
  deleteArticle(slug: String!): Boolean!,
`;
```

## Article rootValue

```js
exports.rootValue = {
  listArticles() {
    return db.articles;
  },
  getArticle({ slug }) {
    return db.articles.find(article => article.slug === slug);
  },
  /* … */
  deleteArticle({ slug }) {
    db.articles = db.articles.filter(article => article.slug !== slug);

    saveDatabase();

    return true;
  },
}
```

## Root schema

```js
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
```

## Middleware

```js
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./graphql');

/* … */

const developmentMode = app.get('env') === 'development';

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: developmentMode,
  pretty: developmentMode,
}));
```
