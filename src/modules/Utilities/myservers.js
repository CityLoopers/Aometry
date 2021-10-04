/* eslint-disable no-unused-vars */
const { CommandInteraction, MessageEmbed, Client } = require('discord.js')

module.exports = {
  /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
  name: 'myservers',
  description: 'Displays all servers that Aometry is connected to',

  async execute (interaction, client) {
    client.guilds.cache.forEach((guild) => {
      interaction.channel.send(`\`${guild.name}\` | ID: \`${guild.id}\``)
    }); interaction.reply('Here you go!')
  }
}
