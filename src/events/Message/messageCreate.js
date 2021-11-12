const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const { prefix } = require('../../Structures/config/config.json')

module.exports = {
  name: 'messageCreate',
  /**
     *
     * @param {Message} message
     * @param {Client} client
     */
  async execute (message, client) {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.prefixCommands.get(commandName) ||
      client.prefixCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author)
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        const missingPermissions = new MessageEmbed()
          .setTitle('ERROR!')
          .setColor('RED')
          .setDescription(`Missing Permissions to run this command (\`${commandName}\`)`)

        message.reply({ embeds: [missingPermissions] })
          .then((sent) => {
            setTimeout(() => {
              sent.delete()
            }, 2000)
          })
      }
    }
    const { cooldowns } = client
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection())
    }
    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 1) * 1000

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        const cooldownEmbed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Command in Cooldown')
          .setDescription(`The command you just tried to use is in cooldown!\n Please wait another ${timeLeft.toFixed(1)} more seconds to run this command again`)
        return message.reply({ embeds: [cooldownEmbed] })
          .then((sent) => {
            setTimeout(() => {
              sent.delete()
            }, 2000)
          })
      }
    }
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

    try {
      command.execute(message, args, commandName, client)
    } catch (error) {
      console.log(error)
      const errorEmbed = new MessageEmbed()
        .setTitle('ERROR')
        .setColor('RED')
        .setDescription('Error while running the command, check the console')
      message.channel.send({ embeds: [errorEmbed] })
    }
  }
}
