const AOMETRY_DATA = 'Aometry collects information about the user.\n\nThis bot stores some data about users as necessary to function.\n\n This is mostly the ID your user is assigned by Discord, linked to a handful of things depending on what you interact with in the bot. \n\nThere are a few commands which store it to keep track of who created something. (such as playlists)\n\n For full details about this as well as more in depth details of what is stored and why, see https://github.com/Enroute-Transport/Aometry/wiki/My-Data.'
const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mydata')
    .setDescription('Provides information about the collection of information about the user.'),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param { Client } client
   */
  async execute (interaction, client) {
    await interaction.reply({
      embeds: [
        {
          description: AOMETRY_DATA,
          color: 5814783,
          author: {
            name: `Aometry v${client.botVersion}`,
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
              label: 'Data Collection Information',
              style: 5,
              url: 'https://github.com/Enroute-Transport/Aometry/wiki/My-Data'
            }
          ]
        }
      ]
    })
  }
}
