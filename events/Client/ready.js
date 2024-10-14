const { Client } = require('discord.js')
const { loadCommands } = require('../../handler/commandHandler')

module.exports = {
  name: 'ready',
  once: true,
  /**
   *
   * @param {Client} client
   *
   */
  execute (client) {
    loadCommands(client)
    console.log('✅ Aometry v24.10.0 Ready!')
    client.user.setActivity('to /help', { type: 'LISTENING' })
    console.log(`✅ Logged in as ${client.user.tag}!`)
    console.log(`Invite Link: \nhttps://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
  }
}
