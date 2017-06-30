'use strict';

const fs = require('fs');
const db = JSON.parse(fs.readFileSync('database.json'));

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
  deleteArticle(slug: String!): Boolean,
`;

exports.rootValue = {
  listArticles() {
    return db.articles;
  },
  getArticle({ slug }) {
    return db.articles.find(article => article.slug === slug);
  },
  createArticle({ title, body }) {
    const newArticle = {
      slug: slugify(title),
      title,
      body,
    };

    db.articles = db.articles.concat(newArticle);

    saveDatabase();

    return newArticle;
  },
  updateArticle({ slug, title, body }) {
    const newArticle = {
      slug: slugify(title),
      title,
      body,
    };

    db.articles = db.articles.map(article =>
      article.slug !== slug
        ? article
        : newArticle
    );

    saveDatabase();

    return newArticle;
  },
  deleteArticle({ slug }) {
    db.articles = db.articles.filter(article => article.slug !== slug);

    saveDatabase();

    return true;
  },
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function saveDatabase() {
  fs.writeFile('database.json', JSON.stringify(db, true, 2), () => {});
}
