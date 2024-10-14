const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client
} = require('discord.js')

const { loadEvents } = require('../../handler/eventHandler')
const { loadCommands } = require('../../handler/commandHandler')

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
    ),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } client
   */
  async execute (interaction, client) {
    const subCommand = interaction.options.getSubcommand()

    switch (subCommand) {
      case 'events':
        for (const [key, value] of client.events) {
          client.removeListener(`${key}`, value, true)
          loadEvents(client)

          interaction.reply({ content: 'Events reloaded!' })
        }

        break
      case 'commands':
        for (const [key, value] of client.commands) {
          loadCommands(client)
          interaction.reply({ content: 'Commands reloaded!' })
        }
        break
    }
  }
}
