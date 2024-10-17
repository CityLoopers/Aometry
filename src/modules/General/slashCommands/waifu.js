const anime = require('anime-actions')
const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'waifu',
  description: 'get waifu',
  module: 'General',
  /**
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  async execute (interaction) {
    const embed = new MessageEmbed()
      .setTitle(`${interaction.user.tag}'s waifu...`)
      .setImage(await anime.kiss())
      .setColor('#03fcf8')
    interaction.reply({ embeds: [embed] })
  }
}
