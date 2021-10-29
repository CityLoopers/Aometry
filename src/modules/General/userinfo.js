/* eslint-disable no-unused-vars */
const { Client, MessageEmbed, ContextMenuInteraction } = require('discord.js')
const moment = require('moment')

module.exports = {
  name: 'userinfo',
  type: 'USER',
  context: true,
  module: 'General',
  /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     */
  async execute (interaction, client) {
    const target = await interaction.guild.members.fetch(interaction.targetId)

    const response = new MessageEmbed()
      .setColor('YELLOW')
      .setAuthor(target.user.tag, target.user.avatarURL({ dynamic: true, size: 512 }))
      .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
      .addField('ID', `${target.user.id}`)
      .addField('Roles', `${target.roles.cache.map(r => r).join(' ').replace('@everyone', '') || 'None'}`)
      .addField('Server Member Since', `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
      .addField('Discord User Since', `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

    interaction.reply({ embeds: [response], ephemeral: true })
  }
}
