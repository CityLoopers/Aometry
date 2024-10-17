const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Provides information about inviting the bot to your server'),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } client
   */
  async execute (interaction, client) {
    await interaction.reply({
      embeds: [
        {
          title: 'Invite Me!',
          description: "I'm a cool Discord Bot, ain't I? Use the button below to invite me to your server!",
          color: 0xFFBE00,
          author: {
            name: 'Aometry',
            icon_url: `${client.user.displayAvatarURL({ dynamic: true })}`
          },
          thumbnail: {
            url: `${client.user.displayAvatarURL({ dynamic: true })}`
          }
        }
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Invite Aometry',
              style: 5,
              url: 'https://discord.com/oauth2/authorize?client_id=886968050119749683&permissions=8&scope=bot%20applications.commands'
            }
          ]
        }
      ]
    })
  }
}
