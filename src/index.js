const { Client, Collection } = require('discord.js')
const Errorhandler = require('discord-error-handler')
const client = new Client({
  intents: 32767,
  partials: ['CHANNEL']
})
const { token } = require('./config.json')

client.commands = new Collection()
client.buttons = new Collection()
require('./handlers/buttons')(client)
require('./handlers/events')(client)
require('./handlers/commands')(client)

const handle = new Errorhandler(client, {
  webhook: { id: '894549337894424616', token: 'h_vK5JYFuEE7nPucgAz0BlUTlGBx8gMi9_uZEd7ZghiF7MPpZw6jGyPc6CW7ymUGtYqG' }
})
process.on('unhandledRejection', error => {
  handle.createrr(client, undefined, undefined, error)
})

client.login(token)
