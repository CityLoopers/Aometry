/* eslint-disable no-unused-vars */
/* module.exports = {
  name: 'messageCreate',
  async execute (message, client) {
    if (message.content.toLowerCase() === 'hello') {
      message.channel.send({ content: 'Hi!' })
    } else {
      const Levels = require('discord-xp')
      const DBURL = require('../../config.json')

      Levels.setURL(DBURL)
      if (!message.guild) return
      if (message.author.bot) return

      const randomAmountOfXp = Math.floor(Math.random() * 29) + 1 // Min 1, Max 30
      const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp)
      if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id)
        message.channel.send({ content: `${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:` })
      }
    }
  }
} */
