require('dotenv').config()

if (!process.env.BOT_TOKEN) {
  throw new Error('Missing BOT_TOKEN in .env')
}
if (!process.env.LOGS_CHANNEL) {
  throw new Error('Missing LOGS_CHANNEL in .env')
}

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  LOGS_CHANNEL: process.env.LOGS_CHANNEL
}
