const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require('discord.js')

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads the bots commands and events')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
      .setName('commands')
      .setDescription('Reloads the commands')
    )
    .addSubcommand((options) => options
      .setName('events')
      .setDescription('Reloads the events')
    )
}
