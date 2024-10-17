/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'reply',
  description: 'Replies',
  permission: 'ADMINISTRATOR',
  module: 'Core',

  execute (message, args, commandName, client) {
    message.reply({ content: args[0].toString() + ' ' + args[1].toString() })
  }
}
