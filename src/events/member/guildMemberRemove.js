const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'guildMemberRemove',
  execute (member) {
    const LeaveEmbed = new MessageEmbed()
      .setColor('RED')
      .setAuthor(`Goodbye 😢`)
      .setDescription(
        `${member} left **${member.guild.name}** server!\nLatest Member Count: **${member.guild.memberCount}**`
      )
      .setFooter(
        `${member.user.tag}`,
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()

    member.guild.channels.cache
      .get('888054076372312065')
      .send({ content: `${member}`, embeds: [LeaveEmbed] })

    const LogEmbed = new MessageEmbed()
      .setColor('RED')
      .setDescription(`${member} left :(`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    member.guild.channels.cache
      .get('888053739406118922')
      .send({ embeds: [LogEmbed] })
  }
}
