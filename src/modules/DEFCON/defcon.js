/* eslint-disable new-cap */
const { CommandInteraction, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  // Command Information Goes Here
  name: 'defcon',
  description: 'Modifies the DEFCON level of the guild',
  module: 'DEFCON',
  options: [{
    name: 'defcon',
    description: 'Displays the DEFCON level of the guild in the current channel',
    type: 'SUB_COMMAND'
  }, {
    name: 'defcon-up',
    description: 'Increases the DEFCON level of the guild',
    type: 'SUB_COMMAND'
  }, {
    name: 'defcon-down',
    description: 'Decrements the DEFCON level of the guild',
    type: 'SUB_COMMAND'
  }, {
    name: 'set-defcon',
    description: 'Sets the DEFCON level of the guild',
    type: 'SUB_COMMAND'
  }],

  /**
* @param {CommandInteraction} interaction
* @param {Client} client
*/
  async execute (interaction, client) {
    // Command Code Goes Here
    const sub = interaction.options.getSubcommand('defcon', 'defcon+', 'defcon-', 'set-defcon')
    const guildConfig = new db.table(`guildConfig_${interaction.guildId}`)

    switch (sub) {
      case 'defcon':

        break
      case 'defcon+':
        break
      case 'defcon-':
        break
      case 'set-defcon':
        break
    }
  }
}
