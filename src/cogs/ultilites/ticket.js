const {
  Client,
  CommandInteraction,
  Guild,
  MessageEmbed
} = require('discord.js')

module.exports = {
  name: 'ticket',
  description: 'Opens a ticket',
  options: [
    {
      name: 'reason',
      description: 'Provide a reason for your ticket',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'General Inquiry',
          value: 'General Inquiry'
        },
        {
          name: 'Bug Report',
          value: 'Bug Report'
        },
        {
          name: 'Feature Request',
          value: 'Feature Request'
        }
      ]
    }
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {Guild} guild
   */
  execute (client, interaction) {
    const logsChannelId = '889175556254498886'
    const logsChannel = interaction.guild.channels.cache.get(logsChannelId)
    const ticketChannel = '<#889175556254498886>'
    const ticketReason = interaction.options.getString('reason')
    const newTicket = new MessageEmbed()
      .setColor('YELLOW')
      .setAuthor(
        'New Ticket Created',
        `${interaction.user.displayAvatarURL({ dynamic: true })}`
      )
      .setDescription(`Ticket Created by ${interaction.user}`)
      .addField('Reason', `${ticketReason}`)
      .addField('Ticket Channel', `${ticketChannel}`)
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
    interaction.followUp({ embeds: [newTicket] })
  }
}
