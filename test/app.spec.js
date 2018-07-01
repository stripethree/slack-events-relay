const assert = require('assert');
const request = require('supertest');

const { app, verifyRelayReq } = require('../src/index');

describe('app', () => {
  it('provides a default route', () => request(app)
    .get('/')
    .expect(200)
    .then((res) => {
      assert.equal(res.text, '🤖');
    }));
});

describe('helpers', () => {
  describe('verify relay request', () => {
    it('checks valid API keys', () => {
      verifyRelayReq({ headers: { 'x-api-key': process.env.API_KEY } });
    });

    it('throws an error for requests missing x-api-key header', () => {
      assert.throws(() => {
        verifyRelayReq({ headers: {} });
      }, Error, 'No API key in request header.');
    });

    it('throws an error for requests with empty x-api-key header', () => {
      assert.throws(() => {
        verifyRelayReq({ headers: { 'x-api-key': '' } });
      }, Error, 'No API key in request header.');
    });

    it('throws an error for requests with an invalid x-api-key header', () => {
      assert.throws(() => {
        verifyRelayReq({ headers: { 'x-api-key': 'invalid-api-key' } });
      }, Error, 'No API key in request header.');
    });
  });
});
