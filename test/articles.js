'use strict';

const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('GET /articles', function() {
  it('lists articles', () => request(app)
    .get('/articles')
    .expect(200)
    .expect(res => res.body.forEach(article => {
      assert.equal(typeof article.slug, 'string');
      assert.equal(typeof article.title, 'string');
      assert.equal(typeof article.body, 'string');
    }))
  );
});

describe('GET /articles/:slug', function() {
  it('reads an article', () => request(app)
    .get('/articles/my-first-article')
    .expect(200)
    .expect({
      slug: 'my-first-article',
      title: 'My first article!',
      body: 'Some really interesting text.',
    })
  );
});

describe('POST /articles', function() {
  it('creates an article', () => Promise.resolve()
    .then(() => request(app)
      .post('/articles')
      .send({ title: 'Test article', body: '<3 Supertest' })
      .expect(200)
    )
    .then(() => request(app)
      .get('/articles/test-article')
      .expect(200)
      .expect({
        slug: 'test-article',
        title: 'Test article',
        body: '<3 Supertest',
      })
    )
  );
});

describe('PUT /articles/:slug', function() {
  it('updates an article', () => Promise.resolve()
    .then(() => request(app)
      .put('/articles/test-article')
      .send({ title: 'Updated article', body: 'Updated body' })
      .expect(200)
    )
    .then(() => request(app)
      .get('/articles/updated-article')
      .expect(200)
      .expect({
        slug: 'updated-article',
        title: 'Updated article',
        body: 'Updated body',
      })
    )
  );
});

describe('DELETE /articles/:slug', function() {
  it('deletes an article', () => Promise.resolve()
    .then(() => request(app)
      .delete('/articles/updated-article')
      .expect(200)
    )
    .then(() => request(app)
      .get('/articles/updated-article')
      .expect(200)
      .expect({})
    )
  );
});
