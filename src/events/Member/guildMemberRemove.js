/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
const { MessageEmbed, GuildMember } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'guildMemberRemove',
  /**
     * @param {GuildMember} member
     */
  async execute (member) {
    const { user, guild } = member
    const ownerDM = await guild.fetchOwner()

    // eslint-disable-next-line new-cap
    const guildConfig = new db.table(`guildConfig_${guild.id}`)

    guildConfig.get('guildId')
    const welcomeChannelId = guildConfig.get('welcomeChannel') || ownerDM.send(`Tried to send a welcome message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`)
    const logsChannelId = guildConfig.get('logsChannel') || ownerDM.send(`Tried to send a logs message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`)

    const GoodBye = new MessageEmbed()
      .setColor('RED')
      .setAuthor('Goodbye', user.avatarURL({ dynamic: true, size: 512 }))
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(`
            ${member} left **${guild.name}**\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**`)
      .setFooter(`${user.tag}`)
      .setTimestamp()
    const welcomeChannel = guild.channels.cache.get(welcomeChannelId)
    // Checks if the channel is defined in the database and if not, sends a message to the guild owner.
    if (typeof welcomeChannelId === 'string') {
      welcomeChannel.send({ embeds: [GoodBye] })
    } else {
      welcomeChannel
    }

    const LogEmbed = new MessageEmbed()
      .setColor('RED')
      .setDescription(`${member} left :(`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    const logsChannel = guild.channels.cache.get(logsChannelId)
    // Checks if the channel is defined in the database and if not, sends a message to the guild owner.
    if (typeof logsChannelId === 'string') {
      logsChannel.send({ embeds: [LogEmbed] })
    } else {
      logsChannel
    }
  }
}
