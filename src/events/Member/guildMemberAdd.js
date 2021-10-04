/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable new-cap */
// eslint-disable-next-line no-unused-vars
const { MessageEmbed, GuildMember } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'guildMemberAdd',
  /**
     * @param {GuildMember} member
     */
  async execute (member) {
    const { user, guild } = member
    const ownerDM = await guild.fetchOwner()
    const guildConfig = new db.table(`guildConfig_${guild.id}`)

    guildConfig.get('guildId')

    const welcomeChannelId = guildConfig.get('welcomeChannel') || ownerDM.send(`Tried to send a welcome message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`)
    const logsChannelId = guildConfig.get('logsChannel') || ownerDM.send(`Tried to send a logs message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`)

    const Welcome = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('🎉 Welcome! 🎉', user.avatarURL({ dynamic: true, size: 512 }))
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(`Welcome ${member} to **${guild.name}**!\nLatest Member Count: **${guild.memberCount}**`)
      .setFooter(`${user.tag}`)
      .setTimestamp()
    if (typeof welcomeChannelId === 'string') {
      const welcomeChannelName = guild.channels.cache.get(welcomeChannelId)
      welcomeChannelName.send({ embeds: [Welcome] })
    } else {
      welcomeChannelId
    }

    const LogEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setThumbnail(user.displayAvatarURL)
      .setDescription(`${member} joined the server.`)
      .addField('Account Created', `<t:${parseInt(user.createdTimestamp / 1000)}:R>`)
      .setTimestamp()

    if (typeof logsChannelId === 'string') {
      const logsChannel = guild.channels.cache.get(logsChannelId)
      logsChannel.send({ embeds: [LogEmbed] })
    } else {
      logsChannelId
    }
  }
}
