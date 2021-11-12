const { Client, Collection } = require('discord.js')
const Errorhandler = require('discord-error-handler')
const client = new Client({
  intents: 32767,
  partials: ['CHANNEL']
})
const { token } = require('./config/config.json')
const { promisify } = require('util')
const { glob } = require('glob')
const pG = promisify(glob)
const Ascii = require('ascii-table')

client.slashCommands = new Collection()
client.buttons = new Collection()
client.prefixCommands = new Collection()
client.cooldowns = new Collection();

['buttons', 'events', 'slashCommands', 'prefixCommands'].forEach(handler => {
  require(`./handlers/${handler}`)(client, pG, Ascii)
})

const handle = new Errorhandler(client, {
  webhook: { id: '894549337894424616', token: 'h_vK5JYFuEE7nPucgAz0BlUTlGBx8gMi9_uZEd7ZghiF7MPpZw6jGyPc6CW7ymUGtYqG' }
})
process.on('unhandledRejection', error => {
  handle.createrr(client, undefined, undefined, error)
})

client.login(token)
console.log(`${process.cwd()}`)
