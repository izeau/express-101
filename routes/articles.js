'use strict';

const fs = require('fs');
const bodyParser = require('body-parser');

const router = module.exports = require('express').Router({
  caseSensitive: true,
  strict: true,
});

const db = JSON.parse(fs.readFileSync('database.json'));

router.get('/articles', (req, res) => {
  res.send(db.articles);
});

router.get('/articles/:slug', (req, res) => {
  res.send(db.articles.find(article => article.slug === req.params.slug));
});

router.use(saveDatabase);

router.delete('/articles/:slug', (req, res) => {
  res.send();

  db.articles = db.articles.filter(article => article.slug !== req.params.slug);
});

router.use(bodyParser.json());

router.post('/articles', (req, res) => {
  res.send();

  db.articles = db.articles.concat({
    slug: slugify(req.body.title),
    title: req.body.title,
    body: req.body.body,
  });
});

router.put('/articles/:slug', (req, res) => {
  res.send();

  db.articles = db.articles.map(article =>
    article.slug !== req.params.slug
      ? article
      : {
        slug: slugify(req.body.title),
        title: req.body.title,
        body: req.body.body,
      }
  );
});

function saveDatabase(req, res, next) {
  next();
  fs.writeFile('database.json', JSON.stringify(db, true, 2), () => {});
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
