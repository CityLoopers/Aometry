const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Displays the help message',
  module: 'Core',
  options: [{
    name: 'page',
    description: 'Which page to display',
    type: 'NUMBER',
    required: true
  }],

  async execute (message, args, commandName, client) {
    const moduleArray = []

    const page = 1
    const limit = 5

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    client.prefixCommands.forEach(command =>
      moduleArray.push({ name: `${command.module}`, value: `**${command.name}**\n${command.description}` }))

    const results = moduleArray.slice(startIndex, endIndex)

    const response = new MessageEmbed()
      .setTitle(`${client.user.username} Help`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setColor('YELLOW')
      .setDescription('List of all available commands')
      .setFields(results)
      .setFooter(`${client.user.username} | Commands: ${moduleArray.length}`)
      .setTimestamp()

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('previous')
        .setLabel('⬅')
        .setStyle('PRIMARY'),

      new MessageButton()
        .setCustomId('previous')
        .setLabel('⬅')
        .setStyle('PRIMARY')
    )
    message.reply({ embeds: [response] })
  }
}
