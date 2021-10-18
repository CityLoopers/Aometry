const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Displays the help message',
  options: [{
    name: 'module',
    description: 'Choose a module',
    type: 'STRING',
    required: false
  }],
  module: 'Core',

  async execute (interaction, client) {
    const module = interaction.options.getString('module')
    const cmdArray = []
    const moduleArray = []

    client.commands.forEach(command =>
      moduleArray.push({ name: `${command.module}`, value: `${command.name}\n${command.description}` }))

    const response = new MessageEmbed()
      .setTitle(`${client.user.username} Help`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setColor('YELLOW')
      .setDescription('List of all available commands')
      .setFields(moduleArray)
      .setFooter(`${client.user.username}`)
      .setTimestamp()

    interaction.reply({ embeds: [response] })
  }
}
