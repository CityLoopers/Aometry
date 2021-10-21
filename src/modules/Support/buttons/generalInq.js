const { ButtonInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'generalInq',
  description: 'Send a general Inquiry message',
  /**
 *
 * @param {ButtonInteraction} interaction
 * @param {Client} client
 */
  async execute (interaction, client) {
    interaction.reply('Hey! Thanks for clicking the button, but we\'re not quite ready yet! Use `/ticket` for all tickets for now!`')
  }
}
