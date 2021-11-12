/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { CommandInteraction, MessageEmbed } = require('discord.js')
module.exports = {
  name: 'guildtools',
  description: 'Useful guild information for debugging purposes',
  options: [{
    name: 'id',
    description: 'The guild ID associated with the guild',
    type: 'SUB_COMMAND'
  }, {
    name: 'owner',
    description: ' Display the guild owner',
    type: 'SUB_COMMAND'
  }, {
    name: 'info-to-console',
    description: 'Display the guild info in the console',
    type: 'SUB_COMMAND'
  }],
  module: 'Tools',
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  async execute (interaction) {
    const sub = interaction.options.getSubcommand('id', 'owner')
    const owner = await interaction.guild.fetchOwner()
    switch (sub) {
      case 'id':
        interaction.reply({ embeds: [new MessageEmbed().setDescription(`${interaction.guildId}`)] })
        break
      case 'owner':
        interaction.reply({ embeds: [new MessageEmbed().setDescription(`${owner}`)] })
        break
      case 'info-to-console':
        console.log(interaction.guild)
        break
    }
  }
}
