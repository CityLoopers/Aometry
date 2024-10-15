const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listguilds')
    .setDescription('Provides information about the servers that the bot is in.'),

  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } client
   */
  async execute (interaction, client) {
    const guilds = await client.guilds.cache
    const allGuilds = []
    guilds.forEach((guild) => {
      allGuilds.push({ name: guild.name, value: guild.id, inline: true })
    })

    await interaction.reply({
      embeds: [
        {
          title: 'My Servers',
          description: 'The servers that the bot is in:',
          color: 5814783,
          fields: allGuilds
        }]
    })
  }
}
