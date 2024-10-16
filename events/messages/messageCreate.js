const { Message } = require('discord.js')

module.exports = {
  name: 'messageCreate',
  /**
     * @param {Message} message
     * @param {Client} client
     */
  execute (message, client) {
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content) return

    if (message.content.toLowerCase().includes('hello')) {
      message.channel.send('Hello!')
    }
  }
}
