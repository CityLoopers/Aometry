const { MessageEmbed } = require('discord.js')
const { owners } = require('../../../Structures/config/config.json')
module.exports = {
  name: 'reboot',
  description: 'Reboot the bot',
  module: 'Tools',
  async execute (message, args, commandName, client) {
    if (message.author.id === owners) {
    message.reply({
      content: 'Restarting . . .'
    }).then(() => {
      process.on('exit', () => {
        require('child_process').spawn(process.argv.shift(), process.argv, {
          cwd: process.cwd(),
          detached: true,
          stdio: 'inherit'
        })
      })
      process.exit()
    })
    } else {
      message.reply({ content: 'You cannot run this command!'})
    }
  }
}
