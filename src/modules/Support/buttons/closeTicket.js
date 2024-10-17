const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  name: 'closeTicket',
  description: 'Displays the Im Sure Message and Button',
  /**
 *
 * @param {ButtonInteraction} interaction
 * @param {Client} client
 */
  async execute (interaction, client) {
    const embed = new MessageEmbed()
      .setTitle('Are you sure?')
      .setDescription('Closing a ticket is permanent, are you sure your query is resolved?')

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('imSure')
        .setLabel('I\'m Sure!')
        .setStyle('SUCCESS'))

    interaction.channel.send({ embeds: [embed], components: [row] })
  }
}
