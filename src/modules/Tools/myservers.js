/* eslint-disable no-unused-vars */
const { CommandInteraction, MessageEmbed, Client } = require('discord.js')

module.exports = {
  /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
  name: 'myservers',
  description: 'Displays all servers that Aometry is connected to',
  module: 'Tools',

  async execute (interaction, client) {
    const guildsArray = []
    client.guilds.cache.forEach((guild) => {
      guildsArray.push({ name: `${guild.name}`, value: `${guild.id}`, inline: true })
    })
    const response = new MessageEmbed()
      .setTitle('Aometry Connected Guilds')
      .setDescription('Aometry is connected to the following guilds')
      .setThumbnail(client.displayAvatarURL({ dynamic: true }))
      .setFields(guildsArray)
      .setColor('YELLOW')
      .setTimestamp()
      .setFooter(`${client.name}`)

    interaction.reply({ embeds: [response] })
  }
}
