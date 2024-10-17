/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  ButtonInteraction,
  ThreadChannel
} = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'setticket',
  description: 'Creates a new Ticket Panel',
  options: [{
    name: 'channel',
    description: 'Provide a reason for your ticket',
    type: 'CHANNEL',
    required: false
  }],
  module: 'Support',
  /**
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  async execute (interaction, client) {
    const guildConfig = new db.table(`guildConfig_${interaction.guildId}`)
    const ownerDM = await interaction.guild.fetchOwner()
    const supportChannelId = guildConfig.get('supportChannel') || interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('Tickets are not enabled in this guild. Please ask the guild administrator to enable them using `/guild-config`')] })
    const channel = interaction.options.getChannel('channel') || supportChannelId

    if (typeof supportChannelId === 'string') {
      const supportChannel = interaction.guild.channels.cache.get(supportChannelId)
      const ticketPanel = new MessageEmbed()
        .setDescription('This is a ticket panel!')
      const row = new MessageActionRow()
        .addComponents(new MessageButton()
          .setCustomId('generalInq')
          .setLabel('🔒 General Inquiry')
          .setStyle('SUCCESS')
        )
        .addComponents(new MessageButton()
          .setCustomId('bugReport')
          .setLabel('🔒 Bug Report')
          .setStyle('SUCCESS')
        )
        .addComponents(new MessageButton()
          .setCustomId('featureRequest')
          .setLabel('🔒 Feature Request')
          .setStyle('SUCCESS'))
      supportChannel.send({ embeds: [ticketPanel], components: [row] })
      interaction.reply({ embeds: [new MessageEmbed().setDescription('Sent a new Ticket Panel')] })
    } else {
      supportChannelId
    }
  }
}
