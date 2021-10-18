const { Client, MessageEmbed, CommandInteraction, Guild, Message } = require('discord.js')

module.exports = {
  name: 'topic',
  description: 'Displays the channel topic',
  options: [{
    name: 'channel',
    description: 'Select a channel.',
    type: 'CHANNEL',
    required: true
  }],
  module: 'Core',
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
  execute (interaction, client) {
    const Target = interaction.options.getChannel('channel')

    const Response = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle(`#${Target.name}`)
      .setURL(`https://discord.com/channels/${interaction.guildId}/${Target.id}`)
      .setDescription(`${Target.topic}`)
      .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }))

    Target.send({ embeds: [Response] })
  }
}
