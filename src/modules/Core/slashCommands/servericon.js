const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'servericon',
  description: 'Displays the server icon',
  module: 'Core',

  async execute (interaction, client) {
    const icon = interaction.guild.iconURL({ dynamic: true, format: 'png', size: 1024 })
    const embed = new MessageEmbed()
    embed.setColor('RED')
    embed.setTitle(`Icon of ${interaction.guild.name}`)
    embed.setImage(icon)
    interaction.reply({ embeds: [embed] })
  }
}
