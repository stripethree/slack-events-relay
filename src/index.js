const bodyParser = require('body-parser');
const debug = require('debug')('relay-app');
const express = require('express');
const logError = require('debug')('relay-app:error');
const { Slack } = require('./slack');

const app = express();

const slack = new Slack(process.env.SLACK_BOT_TOKEN);

// HELPERS
const API_KEY = process.env.API_KEY;
function verifyRelayReq(req) {
  const reqApiKey = req.headers['x-api-key'];
  if (!reqApiKey) {
    throw new Error('No API key in request header.');
  }
  if (reqApiKey !== API_KEY) {
    throw new Error('Invalid API key in request header.');
  }
}

// ROUTES
app.get('/', (req, res) => res.send('🤖'));

const channelId = process.env.SLACK_CHANNEL_ID;
app.post('/relay', bodyParser.json({ verify: verifyRelayReq }), (req, res) => {
  const data = req.body;
  const message = `\`\`\`${JSON.stringify(data, undefined, 2)}\`\`\``;
  slack.sendMessage(channelId, message)
    .catch((err) => logError(err));

  res.sendStatus(200);
});

// START THE THINGS
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 8080;
  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    debug('Server running on port %s', port);
  });
  slack.start();
}


exports.app = app;
exports.verifyRelayReq = verifyRelayReq;
