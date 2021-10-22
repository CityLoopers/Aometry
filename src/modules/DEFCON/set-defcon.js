/* eslint-disable new-cap */
const { CommandInteraction, MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
  name: 'setdefcon',
  description: 'Sets the defcon information for the guild',
  options: [{
    name: 'channel',
    description: 'Channel the DEFCON level of the guild',
    type: 'CHANNEL'
  }],

  async execute (interaction, client) {
    const channel = interaction.options.getChannel('channel')
    const defconDb = new db.table(`defcon_${interaction.guildId}`)
    defconDb.set('defconChannel', channel.id)

    interaction.reply(`Defcon channel set to '${channel}`)
  }
}
