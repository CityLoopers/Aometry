const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute (interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply({
      embeds: [
        {
          color: 5814783,
          fields: [
            {
              name: 'Server Owner',
              value: `${interaction.guild.owner}`,
              inline: true
            },
            {
              name: 'Server Members',
              value: `${interaction.guild.memberCount}`,
              inline: true
            },
            {
              name: 'Server Security',
              value: `${interaction.guild.verificationLevel}`,
              inline: true
            },
            {
              name: 'Channels',
              value: `${interaction.guild.channels.cache.size}`,
              inline: true
            },
            {
              name: 'Roles',
              value: `${interaction.guild.roles.cache.size}`,
              inline: true
            }
          ],
          author: {
            name: `${interaction.guild.name} Server Info`,
            icon_url: `${interaction.guild.iconURL({ dynamic: true })}`
          },
          thumbnail: {
            url: `${interaction.guild.iconURL({ dynamic: true })}`
          },
          footer: {
            text: `Server ID: ${interaction.guild.id} | Server Created: ${interaction.guild.createdAt}`
          }

        }
      ]
    }
    )
  }
}
