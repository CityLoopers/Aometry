const { CommandInteraction, MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
  name: 'contact',
  description: 'Contacts the bot owner',
  options: [{
    name: 'message',
    type: 'STRING',
    description: 'Message to send to the owner',
    required: true
  }],
  /**
 *
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
  async execute (interaction, client) {
    const message = interaction.options.getString('message')
    const owner = config.owners
    const dmEmbed = new MessageEmbed()
      .setTitle(`Message from ${interaction.user}`)
      .setDescription(`${message}`)

    owner.send({ embeds: [dmEmbed] })
  }
}
