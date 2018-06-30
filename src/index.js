const bodyParser = require('body-parser')
const express = require('express');
const { Slack } = require('./slack');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res) => res.send('🤖'));

const slack = new Slack(process.env.SLACK_BOT_TOKEN);
slack.start();
