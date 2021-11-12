# Getting Started with Aometry

## Requirements

- Node.js 16.6.0 or newer
- npm installed

## Manual Setup

### Installing Aometry

- Download Bot
- Run `npm i` to install all dependencies

### Setting Up and Running Aometry

- Rename config-sample.json to config.json and fill the values
  
```json
{
    "token": "bot-token-goes-here",
    "DBURL": "mongodb-url-goes-here",
    "owners": "your-owner-id-goes-here",
    "prefix": "your-prefix-goes-here"
}
```

If you're in need of a guide to set up a token, 

- After configuration finishes use `node .` to start the bot
- Once the bot is up and running, run `[p]guild-config` to configure aspects of the bot
- `[p]` is the prefix for the bot

## Upcoming Changes

### Automatic Setup

Aometry will soon have an automatic configuration system which will allow you to configure Aometry prior to starting the bot for the first time.
