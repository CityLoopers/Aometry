/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ping',
  description: 'Ping!',
  aliases: ['latency', 'lag'],
  permission: 'ADMINISTRATOR',
  module: 'Core',

  execute (message, args, commandName, client) {
    message.reply({ content: 'PONG!' })
  }
}
