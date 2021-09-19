const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const MutedRole = require('../../config.json')

module.exports = {
  name: 'unmute',
  description: 'Unmutes the specified member',
  permission: 'MUTE_MEMBERS',
  options: [
    {
      name: 'user',
      description: 'Specify the user to unmute',
      type: 'USER',
      required: true
    }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  execute (client, interaction) {
    const Target = interaction.options.getMember('user')

    if (!Target.roles.cache.has('889112709675745300'))
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription('The member is not muted')
        ]
      })

    Target.roles.remove('889112709675745300')

    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`${Target} has been unmuted!`)
      ]
    })
  }
}
