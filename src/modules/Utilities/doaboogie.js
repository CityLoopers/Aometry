const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'doaboogie',
  description: 'Does a boogie',
  options: [{
    name: 'user',
    description: 'Select a user to boogie on',
    type: 'USER',
    required: false
  }],
  /**
    * @param {CommandInteraction} interaction
    */
  async execute (interaction) {
    const target = interaction.options.getUser('user') || interaction.user
    interaction.reply({ embeds: [new MessageEmbed().setDescription(`Time to get your boogie on, ${target}!`).setImage('https://64.media.tumblr.com/tumblr_ltqwwyxpAV1qmn1lqo1_250.gifv')] })
  }
}
