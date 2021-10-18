/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const generateTranscript = require('reconlx')
const db = require('quick.db')

module.exports = {
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  name: 'interactionCreate',
  async execute (interaction, client, message) {
    const guildConfig = new db.table(`guildConfig_${interaction.guild.id}`)
    const ownerDM = await interaction.guild.fetchOwner()
    // Slash Command Handler
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName)
      if (!command) {
        const newLocal = '⛔ An error occured while running this command.'
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setDescription(newLocal)
          ]
        }) && client.commands.delete(interaction.commandName)
      }

      command.execute(interaction, client)
    }
    // Button Handler
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case 'closeTicket':
          const embed = new MessageEmbed()
            .setTitle('Are you sure?')
            .setDescription('Closing a ticket is permanent, are you sure your query is resolved?')

          const row = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId('imSure')
              .setLabel('I\'m Sure!')
              .setStyle('SUCCESS')
          )
          interaction.channel.send({ embeds: [embed], components: [row] })
          break

        case 'imSure':
          const logsChannelId = guildConfig.get('logsChannel') || ownerDM.send(`Tried to send a logs message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`)
          const ticketClosed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(
              'Ticket Closed',
                `${interaction.user.displayAvatarURL({ dynamic: true })}`
            )
            .setDescription(`Ticket Created by ${interaction.user}`)
            .addField('Ticket Channel', `${interaction.channel}`)
            .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)

          if (typeof logsChannelId === 'string') {
            const logsChannel = interaction.guild.channels.cache.get(logsChannelId)
            logsChannel.send({ embeds: [ticketClosed] })
          } else {
            logsChannelId
          }
          interaction.channel.setArchived()
          break

        case 'generalInq':
          interaction.reply('Woah there buster, this button is not ready yet, use `/ticket` to open a ticket!')
          break
        case 'bugReport':
          interaction.reply('Woah there buster, this button is not ready yet, use `/ticket` to open a ticket!')
          break
        case 'featureRequest':
          interaction.reply('Woah there buster, this button is not ready yet, use `/ticket` to open a ticket!')
          break

        default:
          console.log('Button Pressed')
          break
      }
    }
  }
}
