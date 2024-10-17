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
    await interaction.reply({
      content: 'Pong!',
      embeds: [

        {
          title: 'This is a test',
          description: 'This is a test embed response!',
          color: 5814783,
          fields: [
            {
              name: 'Field 1',
              value: 'Field Text'
            }
          ]
        }
      ]
    })
  }
}
