/* eslint-disable no-unused-vars */
const { CommandInteraction, Client } = require('discord.js')

module.exports = {
  name: 'emit',
  description: 'event emitter',
  permission: 'ADMINISTRATOR',
  options: [{
    name: 'member',
    description: ' Guild Member Events.',
    type: 'STRING',
    required: true,
    choices: [{
      name: 'guildMemberAdd',
      value: 'guildMemberAdd'
    },
    {
      name: 'guildMemberRemove',
      value: 'guildMemberRemove'
    }
    ]
  }],
  module: 'Tools',
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

  execute (interaction, client) {
    const choices = interaction.options.getString('member')

    switch (choices) {
      case 'guildMemberAdd':
        client.emit('guildMemberAdd', interaction.member)
        interaction.reply({ content: 'Emitted the event.', ephemeral: true })
        break
      case 'guildMemberRemove':

        client.emit('guildMemberRemove', interaction.member)
        interaction.reply({ content: 'Emitted the event.', ephemeral: true })

        break
    }
  }
}
