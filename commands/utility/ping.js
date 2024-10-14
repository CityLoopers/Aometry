const {
  ChatInputCommandInteraction,
  SlashCommandBuilder
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   */
  async execute (interaction) {
    await interaction.reply(
      'Pong!')
  }
}
