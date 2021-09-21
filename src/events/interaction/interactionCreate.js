const { CommandInteraction, Client, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'interactionCreate',
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute (interaction, client) {
    if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: false }).catch(() => {})

      const command = client.commands.get(interaction.commandName)
      if (!command)
        return (
          interaction.followUp({
            content: 'This command does not exist anymore.'
          }) && client.commands.delete(interaction.commandName)
        )

      if (command.permission) {
        const authorPerms = interaction.channel.permissionsFor(
          interaction.member
        )
        if (!authorPerms || !authorPerms.has(command.permission)) {
          const Error1 = new MessageEmbed()
            .setColor('RED')
            .setDescription(
              `⛔ You do not have the required permissions for this command: ${command.permission}`
            )
          return interaction.editReply({ embeds: [Error1] }).then(sent => {
            setTimeout(() => {
              sent.delete()
            }, 3000)
          })
        }
      }

      command.execute(client, interaction)
    }
  }
}
