const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'serverinfo',
  description: 'Provides information about the server',
  module: 'General',
  /**
* @param {CommandInteraction} interaction
* @param {Client} client
*/
  async execute (interaction, client) {
    if (!interaction.guild) return interaction.reply('this command is only meant to be used in servers.')
    function checkDays (date) {
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const days = Math.floor(diff / 86400000)
      return days + (days === 1 ? ' day' : ' days') + ' ago'
    };

    const channels = interaction.guild.channels.cache
    const textChannels = channels.filter(c => c.type === 'GUILD_TEXT').length
    const voiceChannels = channels.filter(c => c.type === 'GUILD_VOICE').length
    const categoryChannels = channels.filter(c => c.type === 'GUILD_CATEGORY').length

    const region = {
      'us-central': 'US Central',
      'us-east': 'US East',
      'us-south': 'US South',
      'us-west': 'US West',
      europe: 'Europe',
      singapore: 'Singapore',
      japan: 'Japan',
      russia: 'Russia',
      hongkong: 'Hong Kong',
      brazil: 'Brazil',
      sydney: 'Sydney',
      southafrica: 'South Africa',
      india: 'India'
    }

    const verificationLevels = {
      NONE: 'None',
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
      VERY_HIGH: 'Very High'
    }

    const system = interaction.guild.systemChannelID ? `<#${interaction.guild.systemChannelID}>` : '`None`'
    const rules = interaction.guild.rulesChannelID ? `<#${interaction.guild.rulesChannelID}>` : '`None`'
    const embed = new MessageEmbed()
      .setAuthor(interaction.guild.name, interaction.guild.iconURL)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .addField('Name', `\`${interaction.guild.name}\``, true)
      .addField('ID', `\`${interaction.guild.id}\``, true)
      .addField('Verification Level', `\`${verificationLevels[interaction.guild.verificationLevel]}\``, true)
      .addField('Members', `\`${interaction.guild.memberCount}\``, true)
      .addField('Highest Role', interaction.guild.roles.highest, true)
      .addField('Emoji Count', `\`${interaction.guild.emojis.cache.size}\``, true)
      .addField('Region', `\`${region[interaction.guild.region]}\``, true)
      .addField('Partnered', `\`${interaction.guild.partnered}\``, true)
      .addField('Verified', `\`${interaction.guild.verified}\``, true)
      .addField('Boosts', `\`${interaction.guild.premiumSubscriptionCount >= 1 ? `${interaction.guild.premiumSubscriptionCount}` : '0'}\``, true)
      .addField('Categories', `\`${categoryChannels}\``, true)
      .addField('Roles', `\`${interaction.guild.roles.cache.size}\``, true)
      .addField('System Channel', system, true)
      .addField('Rules Channel', rules, true)
      .addField('Creation Date', `\`${interaction.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(interaction.channel.guild.createdAt)})\``, true)
      .addField('Channels Counts', `Total: \`${interaction.guild.channels.cache.size}\` || Text: \`${textChannels}\` | Voice: \`${voiceChannels}\``, true)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    interaction.reply({ embeds: [embed] })
  }
}
