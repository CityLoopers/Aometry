/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
const { Client } = require('discord.js')
const mongoose = require('mongoose')
const { DBURL } = require('../../Structures/config/config.json')
const Ascii = require('ascii-table')

module.exports = {
  name: 'ready',
  once: true,
  /**
     *
     * @param {Client} client
     */
  async execute (client) {
    const Table = new Ascii('Servers Connected')
    const guilds = []
    Table.setHeading('Name', 'ID')
    await client.guilds.cache.forEach((guild) => {
      guilds.push(guild.name)
      return Table.addRow(guild.name, guild.id)
    })
    Table.addRow('Number of Guilds', guilds.length)
    console.log(Table.toString())

    console.log(`✅ ${client.user.username} is now online.`)

    const activites = [
      { name: `/help | ${client.guilds.cache.size} servers!`, type: 'WATCHING' },
      { name: `/help | ${client.users.cache.size} users!`, type: 'LISTENING' },
      { name: `/links | ${client.ws.ping}ms`, type: 'LISTENING' },
      { name: '/botinfo | commands!', type: 'LISTENING' }
    ]
    let activity = 0
    client.user.setPresence({ status: 'online', activity: activites[0] })
    setInterval(() => {
      if (activity === activity.length) return
      activity = 0
      activity++
      client.user.setActivity(activites[Math.floor(Math.random() * activites.length)])
    }, 1000 * 35)

    if (!DBURL) return
    mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    }).then(() => {
      console.log('✅ Connected to database!')
    }).catch((err) => {
      console.log(err)
    })
  }
}
