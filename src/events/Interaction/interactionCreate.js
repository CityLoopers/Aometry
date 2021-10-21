/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const generateTranscript = require('reconlx')
const db = require('quick.db')

module.exports = {
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  name: 'interactionCreate',
  async execute (interaction, client, message) {
    const guildConfig = new db.table(`guildConfig_${interaction.guild.id}`)
    const ownerDM = await interaction.guild.fetchOwner()
    // Slash Command Handler
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
    // Button Handler
    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId)
      if (!button) {
        const newLocal = '⛔ An error occured while executing this button.'
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setDescription(newLocal)
          ]
        }) && client.buttons.delete(interaction.customId)
      }

      button.execute(interaction, client)
    }
  }
}
