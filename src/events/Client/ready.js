/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
const { Client } = require('discord.js')
const mongoose = require('mongoose')
const { DBURL } = require('../../config.json')

module.exports = {
  name: 'ready',
  once: true,
  /**
     *
     * @param {Client} client
     */
  execute (client) {
    console.log(`✅ ${client.user.username} is now online.`)
    client.guilds.cache.forEach((guild) => {
      console.log(`Connected to: ${guild.name} | ID: ${guild.id}`)
    })

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
