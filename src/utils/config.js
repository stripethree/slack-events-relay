const fs = require('fs');
const awsUtils = require('./aws');

const logger = require('./logger');

const NODE_ENV = process.env.NODE_ENV || 'development';

const readConfig = (configFile = `src/config/server-${NODE_ENV}.json`) =>
  JSON.parse(fs.readFileSync(configFile, 'utf-8'));

const writeConfig = (configFile = `src/config/server-${NODE_ENV}.json`) =>
  awsUtils
    .getSecret()
    .then((secretData) => {
      const configData = {
        ...secretData,
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
      };

      fs.writeFileSync(configFile, JSON.stringify(configData, '\n', '  '));
    })
    .catch((err) => logger.log('error', err));

module.exports = {
  readConfig,
  writeConfig
};
