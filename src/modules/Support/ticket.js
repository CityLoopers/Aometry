/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
  name: 'ticket',
  description: 'Opens a ticket',
  options: [{
    name: 'reason',
    description: 'Provide a reason for your ticket',
    type: 'STRING',
    required: true,
    choices: [{
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
  }],
  module: 'Support',

  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Guild} guild
     * @param {Message} message
     * @param {ButtonInteraction} button
     */
  async execute (interaction, client, message) {
    const guildConfig = new db.table(`guildConfig_${interaction.guildId}`)
    const ownerDM = await interaction.guild.fetchOwner()
    const result = Math.random()
      .toString(36)
      .substring(2, 7)
    const User = interaction.user
    const logsChannelId = guildConfig.get('logsChannel') || ownerDM.send({ embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription(`Tried to send a logs message in ${interaction.guild} but failed. Please set a channel for logs using \`/guild-config\``)] })
    const logsChannel = interaction.guild.channels.cache.get(logsChannelId)
    const supportChannelId = guildConfig.get('supportChannel') || interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('Tickets are not enabled in this guild. Please ask the guild administrator to enable them using `/guild-config`')] })

    if (typeof supportChannelId === 'string') {
      const supportChannel = interaction.guild.channels.cache.get(supportChannelId)
      const ticketChannel = await supportChannel.threads.create({
        name: `${User.tag}-${result}`,
        autoArchiveDuration: 60,
        reason: 'User created a ticket'
      })
      const ticketReason = interaction.options.getString('reason')
      guildConfig.push(`ticketData_${User}`, { ticketId: result }, { ticketReason: ticketReason })

      const newTicket = new MessageEmbed()
        .setColor('YELLOW')
        .setAuthor(
          'New Ticket Created',
                `${User.displayAvatarURL({ dynamic: true })}`
        )
        .setDescription(`Ticket Created by ${User}`)
        .addField('Reason', `${ticketReason}`)
        .addField('Ticket Channel', `${ticketChannel}`)
        .setThumbnail(`${User.displayAvatarURL({ dynamic: true })}`)
      if (typeof logsChannelId === 'string') { logsChannel.send({ embeds: [newTicket] }) } else { logsChannelId }
      interaction.reply({ embeds: [new MessageEmbed().setColor('GREEN').setDescription(`A ticket has been created! Check it out ${ticketChannel}`)] })
      const ticketManage = new MessageEmbed()
        .setColor('YELLOW')
        .setAuthor('Thanks for creating a ticket!')
        .setThumbnail(`${User.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`Ticket Created by ${User}`)
        .addField('Reason', `${ticketReason}`)
        .addField('While you\'re waiting...', 'Leave a description of your issue and we\'ll get to it ASAP')
        .addField('Close this ticket', 'Close this ticket by clicking the 🔒')

      const closeTicket = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('closeTicket')
          .setLabel('🔒 Close Ticket')
          .setStyle('SUCCESS')
      )
      ticketChannel.send({ content: `<@&882220499927699456> ${User}`, embeds: [ticketManage], components: [closeTicket] })
    } else { supportChannelId }
  }
}
