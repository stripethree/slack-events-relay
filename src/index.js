const bodyParser = require('body-parser')
const express = require('express');
const { Slack } = require('./slack');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res) => res.send('🤖'));

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log('Server running on port %s', port);
});


const slack = new Slack(process.env.SLACK_BOT_TOKEN);
slack.start();
