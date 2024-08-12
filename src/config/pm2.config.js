module.exports = {
  apps: [
    {
      name: 'money-train-server',
      script: 'npm start',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
        SENTRY_DSN:
          'https://bd24f97596ac45d6a11c57cc896630e3@o165138.ingest.us.sentry.io/1236446'
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
        SENTRY_DSN:
          'https://bd24f97596ac45d6a11c57cc896630e3@o165138.ingest.us.sentry.io/1236446'
      }
    }
  ]
};
