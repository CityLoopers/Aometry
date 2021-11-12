/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require('discord.js')
module.exports = {
  name: 'invite',
  description: 'Invite me to your server!',
  module: 'Core',

  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

  async execute (interaction, client) {
    const Invite = new MessageEmbed()
      .setTitle('Invite Me!')
      .setDescription("I'm a cool Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe 👋")
      .setColor('YELLOW')
      .setThumbnail(client.user.displayAvatarURL())

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL('https://discord.com/api/oauth2/authorize?client_id=887632365726351371&permissions=8&scope=bot%20applications.commands')
        .setLabel('Invite Me')
        .setStyle('LINK'),

      new MessageButton()
        .setURL('https://discord.gg/zturVQrhTG')
        .setLabel('Support Server')
        .setStyle('LINK'),

      new MessageButton()
        .setURL('https://discord.gg/Enroute')
        .setLabel('Enroute (Parent Server)')
        .setStyle('LINK')

    )
    interaction.reply({ embeds: [Invite], components: [row] })
  }
}
