/* eslint-disable no-unused-vars */
const { CommandInteraction } = require('discord.js')

module.exports = {
  name: 'ping',
  description: 'Ping!',
  permission: 'ADMINISTRATOR',
  module: 'Core',
  /**
     * @param {CommandInteraction} interaction
     */
  execute (interaction) {
    interaction.reply({ content: 'PONG!' })
  }
}
