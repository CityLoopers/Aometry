const anime = require('anime-actions')
const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'blush',
  description: 'get blush gif',
  module: 'General',
  /**
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  async execute (interaction) {
    const embed = new MessageEmbed()
      .setTitle(`${interaction.user.tag} blushes...`)
      .setImage(await anime.blush())
      .setColor('#03fcf8')
    interaction.reply({ embeds: [embed] })
  }
}
