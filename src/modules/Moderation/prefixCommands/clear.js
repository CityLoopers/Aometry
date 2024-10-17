const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'clear',
  description: 'Deletes a specified number of messages from a channel or user',
  module: 'Moderation',
  permission: 'MANAGE_MESSAGES',
  options: [{
    name: 'amount',
    description: 'The amount of messages to delete',
    type: 'NUMBER',
    required: true
  }, {
    name: 'user',
    description: 'The user to delete messages from',
    type: 'USER',
    required: false
  }],

  /**
* @param {CommandInteraction} interaction
* @param {Client} client
*/
  async execute (interaction, client) {
    const { channel, options } = interaction

    const amount = options.getNumber('amount')
    const target = options.getMember('user')

    const messages = await channel.messages.fetch()

    const response = new MessageEmbed()
      .setColor('YELLOW')

    if (amount > 100 || amount <= 0) {
      Response.setDescription('Amount cannot exceed 100, and cannot be under 1.')

      return interaction.reply({ embeds: [Response] })
    }

    if (target) {
      let i = 0
      const filtered = [];
      // eslint-disable-next-line array-callback-return
      (await messages).filter((m) => {
        if (m.author.id === target.id && amount > i) {
          filtered.push(m)
          i++
        }
      })
      await channel.bulkDelete(filtered, true).then(message => {
        response.setDescription(`Cleared \`${message.size}\` messages from ${target}`)
        interaction.reply({ embeds: [response] })
      })
    } else {
      await channel.bulkDelete(amount, true).then(message => {
        response.setDescription(`Cleared \`${message.size}\` messages from this channel`)
        interaction.reply({ embeds: [response] })
      })
    }
  }
}
