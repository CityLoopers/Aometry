const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Interaction
} = require('discord.js')
const ms = require('ms')
const MutedRole = require('../../config.json')

module.exports = {
  name: 'mute',
  description: 'Mutes the selected user',
  permission: 'MUTE_MEMBERS',
  options: [
    {
      name: 'user',
      description: 'Select a user',
      type: 'USER',
      required: true
    },
    {
      name: 'reason',
      description: 'Provide a reason for the mute',
      type: 'STRING',
      required: true
    },
    {
      name: 'duration',
      description: 'Select a time for the mute',
      type: 'STRING',
      required: false,
      choices: [
        {
          name: '1 hour',
          value: '1h'
        },
        {
          name: '1 Day',
          value: '1d'
        },
        {
          name: 'Test',
          value: '5s'
        },
        {
          name: '3 Days',
          value: '3d'
        }
      ],
      name: 'custom-duration',
      description: 'Provide a custom time (1s/1h/1d)',
      type: 'STRING',
      required: false
    }
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  async execute (client, interaction) {
    const Target = interaction.options.getMember('user')
    const Reason = interaction.options.getString('reason')
    const Time =
      interaction.options.getString('duration') ||
      interaction.options.getString('custom-duration') ||
      '14d'
    if (Target.id === interaction.member.id)
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription(`⛔ You cannot mute yourself!`)
        ]
      })

    if (Target.permissions.has('ADMINISTRATOR'))
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription(`⛔ You cannot mute an Adminstrator!`)
        ]
      })
    if (!interaction.guild.roles.cache.get('889112709675745300'))
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription('The mute role does not exist.')
        ]
      })

    await Target.roles.add('889112709675745300')
    setTimeout(async () => {
      if (!Target.roles.cache.has('889112709675745300')) return
      await Target.roles.remove('889112709675745300')
    }, ms(Time))
    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor('GREEN')
          .setDescription(
            `${Target} has been muted for ${Time} for ${Reason}| ||${Target.id}||`
          )
      ]
    })
  }
}
