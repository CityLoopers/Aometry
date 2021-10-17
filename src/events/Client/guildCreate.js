/* eslint-disable new-cap */

const { Client, Guild } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'guildCreate',
  /**
     *
     * @param {Client} client
     * @param {Guild} guild
     */
  execute (client, guild) {
    console.log(guild.name)
    const ownerDM = guild.fetchOwner()

    ownerDM.send('Hello there! I joined your guild, run `/guild-config` to get started!')
    /* const guildConfig = new db.table(`guildConfig_${client.guildId}`)
    console.log(`connected to new guild: ${client.guild.name} | ${client.guildId}`)
    guildConfig.set('guildId', client.guildId) */
  }
}
