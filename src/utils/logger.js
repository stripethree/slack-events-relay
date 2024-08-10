const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

const NODE_ENV = process.env.NODE_ENV || 'development';
const FORCE_CONSOLE_LOGS = !!process.env.FORCE_CONSOLE_LOGS || false;

const logger = new winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'slack-events-relay' }
});

if (NODE_ENV !== 'development') {
  logger.add(
    new WinstonCloudWatch({
      logGroupName: 'slack-events-relay',
      logStreamName: `slack-events-relay-${NODE_ENV}`,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      awsRegion: process.env.AWS_REGION,
      jsonMessage: true,
      messageFormatter: ({ level, message, additionalInfo }) =>
        `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
          additionalInfo
        )}}`
    })
  );
}

if (NODE_ENV === 'development' || FORCE_CONSOLE_LOGS) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;
