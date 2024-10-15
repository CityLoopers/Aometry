const { Client } = require('discord.js')

/**
 *
 * @param {Client} client
 */
async function findAllConnectedUsers (client) {
  const guilds = await client.guilds.cache
  let totalUsers = 0

  guilds.forEach((guild) => {
    totalUsers += guild.memberCount
  })
  return totalUsers
}

module.exports = { findAllConnectedUsers }
