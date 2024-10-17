const { Trivia } = require('discord-gamecord')

module.exports = {
  name: 'trivia',
  description: 'Trivia',
  module: 'General',
  async execute (interaction, client) {
    new Trivia({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Trivia',
        description: 'You have {time} seconds to respond!',
        color: '#5865F2'
      },
      difficulty: 'medium',
      winMessage: 'GG, Your answer was correct! It was **{answer}**',
      loseMessage: 'Your answer was Incorrect! The correct answer was **{answer}**',
      othersMessage: 'You are not allowed to use buttons for this message!'
    }).startGame()
  }
}
