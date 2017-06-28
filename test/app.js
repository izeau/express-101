'use strict';

const request = require('supertest');
const app = require('../app');

describe('the app', function() {
  it('says hello', () => request(app)
    .get('/hello')
    .expect(200)
    .expect({ hello: 'world' })
  );
});
