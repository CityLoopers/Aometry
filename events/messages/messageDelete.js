const { Message, Client } = require('discord.js')
/**
 * @param {Message} message
 * @param {Client} client
 */
module.exports = {
  name: 'messageDelete',
  execute (message, client) {
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content) return

    const logsChannel = message.guild.channels.cache.get(client.config.LOGS_CHANNEL)
    logsChannel.send({
      embeds: [
        {
          title: `Message Deleted in <#${message.channel.id}>`,
          description: message.content,
          color: 5814783,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL({ dynamic: true })
          },
          footer: {
            text: `ID: ${message.author.id}`
          },
          timestamp: new Date()
        }
      ]
    })
  }
}
