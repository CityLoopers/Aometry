const { Client, Collection } = require('discord.js')
const client = new Client({
  intents: 32767,
  partials: ['CHANNEL']
})
const { token } = require('./config.json')

client.commands = new Collection()
require('./handlers/events')(client)
require('./handlers/commands')(client)

client.login(token)
