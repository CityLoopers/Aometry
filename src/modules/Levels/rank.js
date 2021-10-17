// This command is really only here to test canvacord and not to create a level system (yet)
const Levels = require('discord-xp')
const canvacord = require('canvacord')
const { CommandInteraction, MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
  name: 'rank',
  description: 'Provides the rank of a user',
  options: [{
    name: 'user',
    type: 'USER',
    description: 'Choose the user to see the rank of',
    required: false
  }],
  /**
* @param {CommandInteraction} interaction
* @param {Client} client
*/
  async execute (interaction, client) {
    const target = interaction.options.getMember('user') || interaction.user // Grab the target.

    const user = await Levels.fetch(target.id, interaction.guild.id, true) // Selects the target from the database.

    const rank = new canvacord.Rank() // Build the Rank Card
      .setAvatar(target.displayAvatarURL({ format: 'png', size: 512 }))
      .setCurrentXP(user.xp) // Current User Xp
      .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
      .setRank(user.position) // Position of the user on the leaderboard
      .setLevel(user.level) // Current Level of the user
      .setStatus(target.presence.status)
      .setProgressBar('#FFFFFF')
      .setUsername(target.username)
      .setDiscriminator(target.discriminator)

    rank.build()
      .then(data => {
        const attachment = new MessageAttachment(data, 'RankCard.png')
        interaction.reply(attachment)
      })
    /* const img = interaction.user.displayAvatarURL({ dynamic: false, format: 'png' })

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
    }) */
  }
}
