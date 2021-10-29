const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'dm',
  description: 'Sends a DM to the specified user',
  module: 'Core',
  ownerOnly: true,
  options: [{
    name: 'user',
    description: 'The user to send the DM to',
    type: 'USER',
    required: true
  }, {
    name: 'message',
    description: 'The message to send',
    type: 'STRING',
    required: true
  }],

  async execute (interaction, client) {
    const user = interaction.options.getUser('user')
    const message = interaction.options.getString('message')
    const messageEmbed = new MessageEmbed()
      .setTitle('Message from the Bot Owner')
      .setDescription(message)

    user.send({ embeds: [messageEmbed] })
  }
}
