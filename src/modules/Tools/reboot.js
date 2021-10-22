const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'reboot',
  description: 'Reboot the bot',
  ownerOnly: true,
  async execute (interaction, client) {
    interaction.reply({
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
  }
}
