const { Client, Collection } = require('discord.js')
const client = new Client({ intents: 32767 })
module.exports = client
const { token } = require('./config.json')

client.commands = new Collection()

;['events', 'commands'].forEach(handler => {
  require(`./handlers/${handler}`)(client)
})

client.login(token)
