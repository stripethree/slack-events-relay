const { RTMClient, WebClient } = require('@slack/client');

class Slack {
  constructor(botToken) {
    this.rtmClient = new RTMClient(botToken, {
      useRtmConnect: true,
      dataStore: false
    });
    this.webClient = new WebClient(botToken);
  }

  sendMessage(channelId, message) {
    const options = {
      channel: channelId, text: message
    };
    return this.webClient.chat.postMessage(options);
  }

  start() {
    this.rtmClient.start();
  }
}

exports.Slack = Slack;
