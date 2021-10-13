const { Slots } = require('discord-gamecord')

module.exports = {
  name: 'slots',
  description: 'Slot Machine',
  async execute (interaction, client) {
    new Slots({
      message: interaction,
      slash_command: true,
      embed: {
        title: '🎰 Slot Machine',
        color: '#5865F2'
      }
    }).startGame()
  }
}
