// This command is really only here to test canvacord and not to create a level system (yet)

const canvacord = require('canvacord')
const { CommandInteraction, MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
  name: 'rank',
  description: 'Provides the rank of a user',

  async execute (interaction, client) {
    const img = interaction.user.displayAvatarURL({ dynamic: false, format: 'png' })

    const rank = await new canvacord.Rank()
      .setAvatar(img)
      .setCurrentXP(356)
      .setRequiredXP(500)
      .setStatus('dnd')
      .setProgressBar('#FFFFFF', 'COLOR')
      .setUsername(`${interaction.user.username}`)
      .setDiscriminator(`${interaction.user.discriminator}`)

    const attachment = new MessageAttachment(await rank.build(), 'profile.png')
    await interaction.reply({
      content: 'This is a test',
      files: [attachment]
    })
  }
}
