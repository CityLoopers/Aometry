const { RockPaperScissors } = require('discord-gamecord')
const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'rps',
  description: 'Play rock paper scissors',
  module: 'General',
  options: [{
    name: 'opponent',
    description: 'Choose an opponent to play against',
    type: 'USER',
    required: true
  }],

  async execute (interaction, client) {
    new RockPaperScissors({
      message: interaction,
      slash_command: true,
      opponent: interaction.options.getUser('opponent'),
      embed: {
        title: 'Rock Paper Scissors',
        description: 'Press a button below to make a choice!',
        color: '#5865F2'
      },
      buttons: {
        rock: 'Rock',
        paper: 'Paper',
        scissors: 'Scissors'
      },
      emojis: {
        rock: '🌑',
        paper: '📃',
        scissors: '✂️'
      },
      othersMessage: 'You are not allowed to use buttons for this message!',
      chooseMessage: 'You choose {emoji}!',
      noChangeMessage: 'You cannot change your selection!',
      askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Rock Paper Scissors!',
      cancelMessage: 'Looks like they refused to have a game of Rock Paper Scissors. :(',
      timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
      drawMessage: 'It was a draw!',
      winMessage: '{winner} won the game!',
      gameEndMessage: 'The game went unfinished :('
    }).startGame()
  }
}
