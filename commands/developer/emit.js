const { ChatInputCommandInteraction, Client, SlashCommandBuilder } = require('discord.js')
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName('emit')
    .setDescription('Emits an event')
    .addStringOption((options) => options
      .setName('event')
      .setDescription('The event to emit')
      .setRequired(true)
    ),
  /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
  async execute (interaction, client) {
    const event = interaction.options.getString('event')
    let data

    if (event === 'guildMemberAdd' || event === 'guildMemberRemove') {
      data = interaction.member
    }
    client.emit(event, data)
    await interaction.reply({ content: 'Event emitted!', ephemeral: true })
  }
}
