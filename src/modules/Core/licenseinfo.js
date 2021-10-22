const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'licenseinfo',
  description: 'Displays Aometry\'s license information',

  async execute (interaction, client) {
    const response = new MessageEmbed()
      .setTitle(`License Information for ${client.user.username}`)
      .setColor('YELLOW')
      .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
      .setDescription('This bot is an instance of Aometry-DiscordBot (hereinafter referred to as Aometry).\n Aometry is a free and open source application made available to the public and licensed under the ISC license. The full text of this license is available to you at https://github.com/Enroute-Transport/Aometry/blob/stable/LICENSE.')
    interaction.reply({ embeds: [response] })
  }
}
