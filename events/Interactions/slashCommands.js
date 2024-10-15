const { ChatInputCommandInteraction } = require('discord.js')
module.exports = {
  name: 'interactionCreate',
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  execute (interaction, client) {
    if (!interaction.isChatInputCommand()) return
    const command = client.commands.get(interaction.commandName)
    if (!command) {
      console.error(`[ERR]No command found for ${interaction.commandName} interaction`)
      return interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      }
      )
    }

    if (command.developer && interaction.user.id !== '125791979689869312') {
      console.warn(`[WARN] Developer command attempted by ${interaction.user.tag}`)
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true
      }
      )
    }

    if (command.developer) {
      console.warn(`[WARN] Developer command ${interaction.commandName} used`)
    }

    console.log(`[LOG] User ${interaction.user.tag} used command ${interaction.commandName}`)
    command.execute(interaction, client)
  }
}
