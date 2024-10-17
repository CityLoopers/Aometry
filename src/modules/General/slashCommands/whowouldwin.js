const { CommandInteraction, Client, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'whowouldwin',
  description: 'Shows who would win in a fight!',
  options: [{
    name: 'user',
    description: 'Choose a user to fight against',
    type: 'USER',
    required: true
  }],
  module: 'General',
  /**
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  async execute (interaction, client) {
    const user = interaction.options.getUser('user')
    if (user === interaction.user) interaction.reply('You cannot fight yourself')
    const av1 = interaction.user.displayAvatarURL({ format: 'png' })
    const av2 = user.displayAvatarURL({ format: 'png' })
    const img = `https://api.popcat.xyz/whowouldwin?image1=${encodeURIComponent(av1)}&image2=${encodeURIComponent(av2)}`
    const embed = new MessageEmbed()
      .setColor('YELLOW')
      .setImage(img)
    interaction.reply({ embeds: [embed] })
  }
}
