/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
const { CommandInteraction, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  // Command Information Goes Here
  name: 'defcon',
  description: 'Modifies the DEFCON level of the guild',
  module: 'DEFCON',
  options: [{
    name: 'display',
    description: 'Displays the DEFCON level of the guild in the current channel',
    type: 'SUB_COMMAND'
  }, {
    name: 'up',
    description: 'Increases the DEFCON level of the guild',
    type: 'SUB_COMMAND'
  }, {
    name: 'down',
    description: 'Decrements the DEFCON level of the guild',
    type: 'SUB_COMMAND'
  }, {
    name: 'set',
    description: 'Sets the DEFCON level of the guild',
    type: 'SUB_COMMAND',
    options: [{
      name: 'defcon-number',
      description: 'What the DEFCON level of the guild',
      type: 'NUMBER'
    }]
  }],

  /**
* @param {CommandInteraction} interaction
* @param {Client} client

*/
  async execute (interaction, client) {
    // Command Code Goes Here
    const { options, guild } = interaction
    const setDefcon = options.getNumber('defcon-number')
    const sub = options.getSubcommand('display', 'up', 'down', 'set')
    const guildConfig = new db.table(`guildConfig_${interaction.guildId}`)
    const defconDb = new db.table(`defcon_${interaction.guildId}`)
    const defconChannelId = await guildConfig.get('defconChannel') || interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('DEFCON is not enabled in this guild. Please ask the guild administrator to enable it using `/setup-defcon`')] })

    const defcon = defconDb.get('guildDefcon')
    switch (sub) {
      case 'display':
        if (typeof defconChannelId === 'string') {
          const defconChannel = guild.channels.cache.get(defconChannelId)
          defconChannel.send(`${defcon}`)
        } else {
          defconChannelId
        }
        break
      case 'up':
        if (defcon > 1) {
          defconDb.subtract('guildDefcon', 1)
        } else {
          interaction.reply('DEFCON is already at MAX!')
        }
        break
      case 'down':
        if (defcon === 0) {
          defconDb.add('guildDefcon', 1)
        } else {
          interaction.reply('DEFCON is already at the lowest it can go!')
        }
        break
      case 'set':
        defconDb.set('guildDefcon', setDefcon)
        break
      case 'default':
        break
    }
  }
}
