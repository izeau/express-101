'use strict';

const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('listArticles', function() {
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
});

describe('getArticle', function() {
  it('reads an article', () => request(app)
    .post('/graphql')
    .send({
      query: `
        query ($slug: String!) {
          getArticle(slug: $slug) {
            slug,
            title,
            body,
          }
        }
      `,
      variables: {
        slug: 'my-first-article',
      },
    })
    .expect(200)
    .expect({
      data: {
        getArticle: {
          slug: 'my-first-article',
          title: 'My first article!',
          body: 'Some really interesting text.',
        },
      },
    })
  );
});

describe('createArticle', function() {
  it('creates an article', () => request(app)
    .post('/graphql')
    .send({
      query: `
        mutation ($title: String!, $body: String!) {
          createArticle(title: $title, body: $body) {
            slug,
            title,
            body,
          }
        }
      `,
      variables: {
        title: 'Test article',
        body: '<3 Supertest',
      },
    })
    .expect(200)
    .expect({
      data: {
        createArticle: {
          slug: 'test-article',
          title: 'Test article',
          body: '<3 Supertest',
        },
      },
    })
  );
});

describe('updateArticle', function() {
  it('updates an article', () => request(app)
    .post('/graphql')
    .send({
      query: `
        mutation ($slug: String!, $title: String!, $body: String!) {
          updateArticle(slug: $slug, title: $title, body: $body) {
            slug,
            title,
            body,
          }
        }
      `,
      variables: {
        slug: 'test-article',
        title: 'Updated article',
        body: 'Updated body',
      },
    })
    .expect(200)
    .expect({
      data: {
        updateArticle: {
          slug: 'updated-article',
          title: 'Updated article',
          body: 'Updated body',
        },
      },
    })
  );
});

describe('deleteArticle', function() {
  it('deletes an article', () => request(app)
    .post('/graphql')
    .send({
      query: `
        mutation ($slug: String!) {
          deleteArticle(slug: $slug)
        }
      `,
      variables: {
        slug: 'updated-article',
      },
    })
    .expect(200)
    .expect({
      data: {
        deleteArticle: true,
      },
    })
  );
});
