const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'clearchat',
  description: 'Clears the chat',
  permission: 'MANAGE_MESSAGES',
  options: [
    {
      name: 'amount',
      description: 'Provide the amount of messages you want to delete.',
      type: 'NUMBER',
      required: true
    },
    {
      name: 'user',
      description: 'Provide a user to remove only their messages.',
      type: 'USER',
      required: false
    }
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute (client, interaction) {
    const Amount = interaction.options.getNumber('amount')
    const Target = interaction.options.getMember('user')
    const Channel = interaction.channel
    const Messsages = Channel.messages.fetch()

    if (Target) {
      const TargetMessages = (await Messsages).filter(
        m => m.author.id === Target.id
      )
      await Channel.bulkDelete(TargetMessages, true)
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Deleted ${Amount} messages sent by ${Target}`)
        ]
      })
    } else {
      Channel.bulkDelete(Amount, true)
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Deleted ${Amount} messages in ${Channel}!`)
        ]
      })
    }
  }
}
