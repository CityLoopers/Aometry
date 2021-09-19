const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'help',
  description: 'Sends a list of commands to help you navigate the bot!',
  execute (client, interaction) {
    const Response = new MessageEmbed()
      .setColor('YELLOW')
      .setAuthor(
        'Aometry Help',
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        '**Aometry v21.09.01c**\n`/help` Displays this menu\n`/ping` Displays the latency from you to the bot in ms\n**Administrator ONLY**\n`/avatar` Sends your avatar or the avatar of another user\n`/userinfo` Sends your user information or the information of another user'
      )
      .setFooter('https://gunzel.xyz')
    interaction.followUp({ embeds: [Response] })
  }
}
