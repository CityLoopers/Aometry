/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable max-len */
const { MessageEmbed, GuildMember } = require('discord.js')
const db = require('quick.db')

module.exports = {
  /**
     * @param {GuildMember} member
     */
  name: 'messageDelete',
  async execute (oldMessage, newMessage, member) {
    if (oldMessage.author.bot) return
    const { guild } = newMessage
    const ownerDM = await guild.fetchOwner()
    const count = 1950
    const Original = oldMessage.content.slice(0, count) + (oldMessage.content.length > count ? ' ...' : '')
    const Edited = newMessage.content.slice(0, count) + (newMessage.content.length > count ? '...' : '')
    const guildConfig = new db.table(`guildConfig_${guild.id}`)

    const logsChannelId = guildConfig.get('logsChannel') || ownerDM.send(`Tried to send a logs message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`)

    const logEmbed = new MessageEmbed()
      .setColor('ORANGE')
      .setTitle(' ✏️ Message Edited')
      .setDescription(`[Message](${newMessage.url}) in ${newMessage.channel} has been edited by ${newMessage.author}.
        \n
        **Original**: \`\`\`${Original}\`\`\`
        **Edited**: \`\`\`${Edited}\`\`\``)
      .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
      .addField('Message Link', `[Click Here](${newMessage.url})`)
      .setTimestamp()
    if (newMessage.attachments.size > 0) {
      logEmbed.addField('Attachments:', `${newMessage.attachments.map((a) => a.url)}`, true)
    }

    const logsChannel = guild.channels.cache.get(logsChannelId)
    // Checks if the channel is defined in the database and if not, sends a message to the guild owner.
    if (typeof logsChannel === 'string') {
      logsChannel.send({ embeds: [logEmbed] })
    } else {
      logsChannel
    }
  }
}
