const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'emojis',
  description: 'View all emojis in the guild',
  module: 'General',
  /**
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  async execute (interaction, client) {
    let Emojis = ''
    let EmojisAnimated = ''
    let EmojiCount = 0
    let Animated = 0
    let OverallEmojis = 0
    function Emoji (id) {
      return client.emojis.cache.get(id).toString()
    }
    interaction.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++
      if (emoji.animated) {
        Animated++
        EmojisAnimated += Emoji(emoji.id)
      } else {
        EmojiCount++
        Emojis += Emoji(emoji.id)
      }
    })
    const Embed1 = new MessageEmbed()
      .setTitle(`Emojis in ${interaction.guild.name}.`)
      .setDescription(
        `**Animated \`${Animated}\`**:\n${EmojisAnimated}\n\n\n**Standard \`${EmojiCount}\`**:\n${Emojis}\n\n\n**Overall emojis \`${OverallEmojis}\`**`
      )
      .setColor('RANDOM')
    interaction.reply({ embeds: [Embed1] })
  }
}
