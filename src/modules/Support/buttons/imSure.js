/* eslint-disable new-cap */
/* eslint-disable no-unused-expressions */
const { ButtonInteraction, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'imSure',
  description: 'Archives the ticket channel',
  /**
 *
 * @param {ButtonInteraction} interaction
 * @param {Client} client
 */
  async execute (interaction, client) {
    const guildConfig = new db.table(`guildConfig_${interaction.guild.id}`)
    const ownerDM = await interaction.guild.fetchOwner()
    const logsChannelId = guildConfig.get('logsChannel') || ownerDM.send(`Tried to send a logs message but no channel was defined. Please use \`/guild-config\` in the guild: ${interaction.guild}`)
    const ticketClosed = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor(
        'Ticket Closed',
                 `${interaction.user.displayAvatarURL({ dynamic: true })}`
      )
      .setDescription(`Ticket Created by ${interaction.user}`)
      .addField('Ticket Channel', `${interaction.channel}`)
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
    await interaction.channel.send({ embeds: [ticketClosed] })

    if (typeof logsChannelId === 'string') {
      const logsChannel = interaction.guild.channels.cache.get(logsChannelId)
      logsChannel.send({ embeds: [ticketClosed] })
    } else {
      logsChannelId
    }
    interaction.channel.setArchived()
  }
}
