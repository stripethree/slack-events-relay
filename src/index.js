const bodyParser = require('body-parser');
const debug = require('debug')('relay-app');
const express = require('express');
const { Slack } = require('./slack');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const slack = new Slack(process.env.SLACK_BOT_TOKEN);

// ROUTES
app.get('/', (req, res) => res.send('🤖'));

// START THE THINGS
const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  debug('Server running on port %s', port);
});

slack.start();
