/* eslint-disable no-unused-vars */
const { CommandInteraction, MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  name: 'remindme',
  description: 'Remind me of something in a given time',
  options: [{
    name: 'when',
    description: 'When to remind you',
    type: 'STRING',
    required: true,
    choices: [{
      name: '1 hour',
      value: '1h'
    },
    {
      name: '1 Day',
      value: '1d'
    },
    {
      name: '5 Seconds',
      value: '5s'
    },
    {
      name: '3 Days',
      value: '3d'
    }
    ]
  }, {
    name: 'what',
    description: 'What you want to be reminded of',
    type: 'STRING',
    required: true
  }],
  module: 'General',

  async execute (interaction, client) {
    const { options } = interaction
    const time = options.getString('when')
    const user = interaction.user
    const reminder = options.getString('what')

    const remindertime = new MessageEmbed()
      .setColor('YELLOW')
      .setDescription(`**Your reminder will go off in ${time}**`)

    interaction.reply({ embeds: [remindertime] })

    const reminderdm = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('**🎉🎉 REMINDER 🎉🎉**')
      .setDescription(`**It has been ${time}**`)
      .addField('Reminder', `${reminder}`)

    setTimeout(async function () {
      try {
        await user.send({ embeds: [reminderdm] })
      } catch (err) {

      }
    }, ms(time))
  }
}
