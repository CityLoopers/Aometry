const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'leave-guild',
  description: 'Gets Aometry to leave the specified guild.',
  module: 'Tools',
  ownerOnly: true,
  options: [{
    name: 'guild-id',
    type: 'STRING',
    required: true
  }],

  /**
* @param {CommandInteraction} interaction
* @param {Client} client
*/
  async execute (interaction, client) {
    const guildId = interaction.options.getString('guild-id')
    const guild = client.guilds.cache.get(guildId)
    guild.leave()
    interaction.reply({ content: `Left the guild, ${guild.name} ${guild.id}` })
  }
}
