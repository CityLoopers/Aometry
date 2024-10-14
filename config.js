require('dotenv').config()

if (!process.env.BOT_TOKEN) {
  throw new Error('Missing BOT_TOKEN in .env')
}

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN
}
