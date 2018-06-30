const { Slack } = require('./slack');
const slack = new Slack(process.env.SLACK_BOT_TOKEN);
slack.start();
