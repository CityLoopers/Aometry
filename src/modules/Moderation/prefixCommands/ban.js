/* eslint-disable new-cap */
const { CommandInteraction, MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
  name: 'ban',
  description: 'Bans the user',
  module: 'Moderation',
  options: [{
    name: 'user',
    description: 'The user to ban',
    type: 'USER',
    required: true
  }, {
    name: 'reason',
    description: 'The reason for the ban',
    type: 'STRING',
    required: true
  }],

  async execute (interaction, client) {
    const banUser = interaction.options.getUser('user')
    const reason = interaction.options.getString('reason')
    const infractions = new db.table(`infractions_${interaction.guild.id}`)
    infractions.push('user', banUser)
    infractions.push('user.reason', reason)
    infractions.push('user.executor', interaction.user)
  }
}
