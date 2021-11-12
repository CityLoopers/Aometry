/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { CommandInteraction, MessageEmbed } = require('discord.js')
module.exports = {
  name: 'guildtools',
  description: 'Useful guild information for debugging purposes',
  module: 'Tools',
  permission: 'ADMINISTRATOR',
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  async execute (message, args, commandName, client) {
    const sub = args[0]
    const owner = await message.guild.fetchOwner()
    switch (sub) {
      case 'id':
        message.reply({ embeds: [new MessageEmbed().setDescription(`${message.guild.id}`)] })
        break
      case 'owner':
        message.reply({ embeds: [new MessageEmbed().setDescription(`${owner}`)] })
        break
      case 'info-to-console':
        console.log(message.guild)
        break
    }
  }
}
