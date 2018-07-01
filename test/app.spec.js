const assert = require('assert');
const request = require('supertest');

const { app } = require('../src/index');

describe('app', () => {
  it('provides a default route', () => request(app)
    .get('/')
    .expect(200)
    .then((res) => {
      assert.equal(res.text, '🤖');
    }));
});
