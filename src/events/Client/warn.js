const { Client } = require('discord.js')

module.exports = {
  name: 'warn',
  /**
   *
   * @param {Client} client
   */
  execute (client) {
    console.warn()
  }
}
