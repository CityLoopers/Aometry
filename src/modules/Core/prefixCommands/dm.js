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

  async execute (message, args, commandName, client) {
    const user = message.mentions.users.first()

    const messageEmbed = new MessageEmbed()
      .setTitle('Message from the Bot Owner')
      .setDescription(message)

    user.send({ embeds: [messageEmbed] })
  }
}
