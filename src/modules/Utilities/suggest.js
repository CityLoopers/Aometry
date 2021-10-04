/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
const { CommandInteraction, MessageEmbed, Guild, GuildMember } = require('discord.js')
const db = require('quick.db')
/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 * @param {Guild} guild
 * @param {GuildMember} member
 */
module.exports = {
  name: 'suggest',
  description: 'Suggest a feature',
  options: [{
    name: 'title',
    description: 'Set a title for the suggestion',
    type: 'STRING',
    required: true
  },
  {
    name: 'description',
    description: 'Set a description for the suggestion',
    type: 'STRING',
    required: true
  }
  ],
  async execute (interaction, client) {
    const guildConfig = new db.table(`guildConfig_${interaction.guild.id}`)
    const { options, user, guild } = interaction
    const ownerDM = await guild.fetchOwner()
    const title = options.getString('title')
    const description = options.getString('description')
    const suggestionChannelId = guildConfig.get('suggestChannel') || interaction.reply({ embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('Suggestions are not enabled in this guild. Please ask the guild administrator to enable them using `/guild-config`')] })

    const identifier = Math.random()
      .toString(36)
      .substring(2, 7)

    const response = new MessageEmbed()
      .setAuthor(`${user.username}`, user.avatarURL({ dynamic: true }))
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setColor('YELLOW')
      .setTitle('New Suggestion')
      .setDescription(`New suggestion by: ${user}`)
      .setFields([{
        name: 'Title',
        value: `${title}`,
        inline: true
      },
      {
        name: 'Description',
        value: `${description}`,
        inline: true
      }
      ])
      .setFooter(`Suggested by: ${user.tag} | Suggestion ID: ${identifier}`)
      .setTimestamp()

    if (typeof suggestionChannelId === 'string') {
      const suggestionChannel = guild.channels.cache.get(suggestionChannelId)
      const message = await suggestionChannel.send({ embeds: [response], fetchReply: true })
      message.react('✅')
      message.react('⛔')

      interaction.reply({ embeds: [new MessageEmbed().setColor('GREEN').setTitle('Suggestion Logged!').setDescription(`Thank your for your suggestion, ${user}! \nSuggestion ID: ${identifier}`)] })
    } else {
      // eslint-disable-next-line no-unused-expressions
      suggestionChannelId
    }
  }
}
