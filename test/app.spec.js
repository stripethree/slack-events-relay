const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');

const { app, slack, verifyRelayReq } = require('../src/index');

describe('app', () => {
  describe('default route', () => {
    it('provides a default route', () => request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        assert.equal(res.text, '🤖');
      }));
  });

  describe('relay route', () => {
    it('sends a Slack message with POST data', () => {
      const sendMessageStub = sinon.stub(slack, 'sendMessage').returns(Promise.resolve({}));
      const postData = { key: 'value' };
      request(app)
        .post('/relay')
        .send(postData)
        .set('Content-Type', 'application/json')
        .set('x-api-key', process.env.API_KEY)
        .expect(200)
        .then(() => {
          const expected = `\`\`\`${JSON.stringify(postData, undefined, 2)}\`\`\``;
          assert.equal(expected, sendMessageStub.getCall(0).args[1]);
        });
    });
  });
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
