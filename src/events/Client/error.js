const { Client } = require('discord.js')

module.exports = {
  name: 'error',
  /**
   *
   * @param {Client} client
   */
  execute (client) {
    console.error()
  }
}
