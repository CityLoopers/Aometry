const { Client, Collection } = require('discord.js')
const Errorhandler = require('discord-error-handler')
const client = new Client({
  intents: 32767,
  partials: ['CHANNEL']
})
const { token } = require('./config.json')

client.commands = new Collection()
require('./handlers/events')(client)
require('./handlers/commands')(client)

const handle = new Errorhandler(client, {
  webhook: { id: '894549337894424616', token: 'KoOZsBuLtzWUdlKh3A3jFNXv0yxxTFhFikEImHkjCAxRLSZsQsuJ_fNtvdkEDB_N7qlr' }
})
process.on('unhandledRejection', error => {
  handle.createrr(client, undefined, undefined, error)
})

client.login(token)
