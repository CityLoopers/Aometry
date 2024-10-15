const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client
} = require('discord.js')

const { findAllConnectedUsers } = require('../../Utilities/findAllConnectedUsers')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Displays information about the bot'),
  /**
     *
     * @param { ChatInputCommandInteraction } interaction
     * @param { Client } client
     */
  async execute (interaction, client) {
    const totalUsers = await findAllConnectedUsers(client)
    await interaction.reply({
      embeds: [
        {
          description: 'Aometry is a multipurpose discord bot created by Finneh!',
          color: 5814783,
          fields: [
            {
              name: 'Bot Statistics',
              value: `- ${client.guilds.cache.size} servers\n- ${totalUsers} users`,
              inline: true
            },
            {
              name: 'Invite Me!',
              value: '[Click Here](https://discord.com/oauth2/authorize?client_id=886968050119749683&permissions=8&scope=bot%20applications.commands)',
              inline: true
            }
          ],
          author: {
            name: `Aometry v${client.botVersion}`,
            url: 'https://i.imgur.com/8hQoOwS.png',
            icon_url: 'https://i.imgur.com/8hQoOwS.png'
          },
          thumbnail: {
            url: 'https://i.imgur.com/8hQoOwS.png'
          }
        }
      ]
    })
  }
}
