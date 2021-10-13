/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable new-cap */
// eslint-disable-next-line no-unused-vars
const { MessageEmbed, GuildMember, MessageAttachment } = require('discord.js')
const db = require('quick.db')
const canvacord = require('canvacord')
const fonts = [
  { path: './fonts/lexend.ttf', face: { family: 'lexend+deca', weight: 'medium', style: 'normal' } }
]
module.exports = {
  name: 'guildMemberAdd',
  /**
     * @param {GuildMember} member
     */
  async execute (member) {
    const { user, guild } = member
    const ownerDM = await guild.fetchOwner()
    const guildConfig = new db.table(`guildConfig_${guild.id}`)

    guildConfig.get('guildId')

    const welcomeChannelId = guildConfig.get('welcomeChannel') || ownerDM.send(`Tried to send a welcome message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`)
    const logsChannelId = guildConfig.get('logsChannel') || ownerDM.send(`Tried to send a logs message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`)

    const welcomeCard = new canvacord.Welcomer()
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setGuildName(guild.name)
      .setAvatar(user.displayAvatarURL({ format: 'png' }))
      .setColor('title', '#FEFCFC') // white
      .setColor('username-box', '#FEFCFC') // white
      .setColor('discriminator-box', '#FEFCFC') // white
      .setColor('message-box', '#FEFCFC') // white
      .setColor('border', '#000000') // black
      .setColor('avatar', '#FEFCFC') // white
      .setBackground('https://cdn.discordapp.com/attachments/889354876746878996/894400002863005716/backgroundWelcome.PNG') // should be png format
      .setMemberCount(guild.memberCount)
      // .registerFonts(fonts)
    const attachment = new MessageAttachment(await welcomeCard.build({ font: 'lexend' }), 'welcome.png')

    if (typeof welcomeChannelId === 'string') {
      const welcomeChannelName = guild.channels.cache.get(welcomeChannelId)
      welcomeChannelName.send({ files: [attachment] })
    } else {
      welcomeChannelId
    }

    const LogEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('New Member!')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${member} joined the server.`)
      .addField('Account Created', `<t:${parseInt(user.createdTimestamp / 1000)}:R>`)
      .setTimestamp()

    if (typeof logsChannelId === 'string') {
      const logsChannel = guild.channels.cache.get(logsChannelId)
      logsChannel.send({ embeds: [LogEmbed] })
    } else {
      logsChannelId
    }
  }
}
