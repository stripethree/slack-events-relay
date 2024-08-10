const express = require('express');
const fs = require('fs');
const Sentry = require('@sentry/node');

const statusRouter = express.Router();

statusRouter.get('/', (req, res) => {
  const versionInfoFile = `src/config/versionInfo.json`;

  try {
    const versionInfo = JSON.parse(fs.readFileSync(versionInfoFile, 'utf-8'));
    res.status(200).json({
      versionInfo
    });
  } catch (err) {
    res.status(200).json({
      versionInfo: 'unavailable'
    });
  }
});

statusRouter.get('/sentry-test', (req, res) => {
  throw new Error('The slack-events-relay has has dropped the baton!');
});

module.exports = statusRouter;
