const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const Sentry = require('@sentry/node');

const { statusRouter } = require('./routes');

const logger = require('./utils/logger');
const { initSentry } = require('./utils/sentry');

const { Slack } = require('./slack');

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const slack = new Slack(process.env.SLACK_BOT_TOKEN);

const router = express.Router();

// unprotected routes
router.use('/status', statusRouter);

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

app.get('/', (req, res) => res.send('🤖'));

const channelId = process.env.SLACK_CHANNEL_ID;
app.post('/relay', bodyParser.json({ verify: verifyRelayReq }), (req, res) => {
  const data = req.body;
  const message = `\`\`\`${JSON.stringify(data, undefined, 2)}\`\`\``;
  slack.sendMessage(channelId, message).catch((err) => logError(err));

  res.sendStatus(200);
});

const sentryDsn = process.env.SENTRY_DSN.trim();
const useSentry = !!sentryDsn;
const nodeEnv = process.env.NODE_ENV || 'development';

logger.info(`Monitoring with Sentry is ${useSentry ? 'enabled' : 'disabled'}`);
if (useSentry) {
  initSentry(appConfig.SENTRY_DSN, appConfig.NODE_ENV);

  // fall through error handler
  app.use(function onError(err, req, res, next) {
    logger.error(err);
    res.statusCode = 500;
    res.end(res.sentry + '\n');
  });
}

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  logger.info(`http server listening on port ${port}`);
  slack.start();
});
