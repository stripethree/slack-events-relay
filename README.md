# Slack Events Relay

While working on [`launch-vehicle-fbm`](https://github.com/CondeNast/launch-vehicle-fbm), my team started writing a client to dump chat interactions to a private Slack channel for debugging purposes. This evolved into [`messenger-slack-ghost`](https://github.com/crccheck/messenger-slack-ghost). What I am looking to do here is evolve this concept into something I can use to debug events on websites I manage by providing some details to a Slack channel.

![Node.js CI](https://github.com/stripethree/slack-events-relay/workflows/Node.js%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/83d1fba8a9ddaab579e9/maintainability)](https://codeclimate.com/github/stripethree/slack-events-relay/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/83d1fba8a9ddaab579e9/test_coverage)](https://codeclimate.com/github/stripethree/slack-events-relay/test_coverage)

## Prerequisites

Access to a Slack team with the permissions to create an application and bot user are required. Slack will provide a `SLACK_BOT_TOKEN` and this token needs to be available in the runtime environment.

Use [`example.env`](./example.env) as a guide.

My workflow is to copy this file to `.env` and use `export $(cat .env | xargs)` to prepare the environment.

## Usage

- `yarn` to install dependencies
- `yarn run dev` to start a local instance of the
  application with a file watcher

With the _dev_ target running, _http://localhost:8080_ will provide an HTTP `200` response with a 🤖 in the body.

## Logging and metrics

The [debug] package is for a firehose of data sent to stdout/stderr

[debug]: https://github.com/visionmedia/debug

## Additional information

### Environment variables

| Key                | Required? | Default? |
| ------------------ | --------- | -------- |
| `API_KEY`          | Y         | _none_   |
| `PORT`             | N         | 8080     |
| `SENTRY_DSN`       | N         | _none_   |
| `SLACK_BOT_TOKEN`  | Y         | _none_   |
| `SLACK_CHANNEL_ID` | Y         | _none_   |

### Endpoints

| Route | Methods | Description |
| ----- | ------- | ----------- |
| `/`   | `GET`   | root route  |
