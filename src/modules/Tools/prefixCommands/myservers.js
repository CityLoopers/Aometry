/* eslint-disable no-unused-vars */
const { MessageEmbed, Client } = require('discord.js')

module.exports = {
  name: 'myservers',
  description: 'Displays all servers that Aometry is connected to',
  module: 'Tools',

  async execute (message, args, commandName, client) {
    const guildsArray = []
    client.guilds.cache.forEach((guild) => {
      guildsArray.push({ name: `${guild.name}`, value: `${guild.id}`, inline: true })
    })
    const response = new MessageEmbed()
      .setTitle('Aometry Connected Guilds')
      .setDescription('Aometry is connected to the following guilds')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setFields(guildsArray)
      .setColor('YELLOW')
      .setTimestamp()
      .setFooter(`${client.user.username}`)

    message.reply({ embeds: [response] })
  }
}
