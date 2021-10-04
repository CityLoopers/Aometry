/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  name: 'interactionCreate',
  async execute (interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName)
      if (!command) {
        const newLocal = '⛔ An error occured while running this command.'
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setDescription(newLocal)
          ]
        }) && client.commands.delete(interaction.commandName)
      }

      command.execute(interaction, client)
    }
  }
}
