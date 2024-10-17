const { CommandInteraction, MessageEmbed } = require('discord.js')
const config = require('../../../Structures/config/config.json')

module.exports = {
  name: 'contact',
  description: 'Contacts the bot owner',

  async execute (message, args, commandName, client) {
    const toSend = args[0].toString()
    const owner = client.users.cache.get(config.owners)
    const dmEmbed = new MessageEmbed()
      .setTitle(`Message from ${message.author.tag}`)
      .setDescription(`${toSend}`)

    owner.send({ embeds: [dmEmbed] })
  }
}
