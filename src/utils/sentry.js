const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

const initSentry = (dsn, environment) => {
  Sentry.init({
    dsn,
    environment,
    integrations: [nodeProfilingIntegration()]
  });
  return Sentry;
};

module.exports = {
  initSentry
};
