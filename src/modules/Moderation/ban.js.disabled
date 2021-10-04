/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Bans the target member',
  permission: 'ADMINISTRATOR',
  options: [
    {
      name: 'user',
      description: 'Select a user to ban.',
      type: 'USER',
      required: true
    },
    {
      name: 'reason',
      description: 'Choose the reason for the ban.',
      type: 'STRING',
      required: true
    },
    {
      name: 'messages',
      description: 'Choose whether to remove messages',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: "Don't delete any",
          value: '0'
        },
        {
          name: 'Previous 7 days.',
          value: '7'
        }
      ]
    }
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  execute (client, interaction) {
    const Target = interaction.options.getMember('user')

    if (Target.id === interaction.member.id) {
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription('⛔ You cannot ban yourself!')
        ]
      })
    }

    if (Target.permissions.has('ADMINISTRATOR')) {
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription('⛔ You cannot ban an Adminstrator!')
        ]
      })
    }

    const Reason = interaction.options.getString('reason')
    if (Reason.length > 512) {
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription('⛔ The reason cannot exceed 512 characters!')
        ]
      })
    }

    const Amount = interaction.options.getString('messages')
    Target.ban({ days: Amount, reason: Reason })

    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`✅ **${Target.user.username}** has been banned!`)
      ]
    })
  }
}
