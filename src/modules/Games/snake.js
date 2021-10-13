const { Snake } = require('discord-gamecord')

module.exports = {
  name: 'snake',
  description: 'Snake Game',
  async execute (interaction, client) {
    new Snake({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Snake Game',
        color: '#5865F2',
        OverTitle: 'Game Over'
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢' },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️',
        down: '⬇️',
        right: '➡️',
        left: '⬅️'
      }
    }).startGame()
  }
}
