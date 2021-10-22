/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const generateTranscript = require('reconlx')
const config = require('../../config.json')
const db = require('quick.db')
const owners = ('../../config.json')

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

      // eslint-disable-next-line eqeqeq
      if (command.ownerOnly == true) {
        if (!owners.includes(interaction.member.id)) return interaction.reply({ content: "You can't use this command!", ephemeral: true })
        const naughtyLogChannel = client.channels.cache.get('894549317312995338')
        naughtyLogChannel.send(`${interaction.user} (${interaction.user.id}) tried to run (${interaction.commandName}). They are NOT an OWNER. one moment while I warm up my D34DLY N3UR0T0X1N emitters...`)
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
