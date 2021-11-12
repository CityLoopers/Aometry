/* eslint-disable max-len */
const { Constants } = require('discord.js')

module.exports = async (client, pG, Ascii) => {
  const Table = new Ascii('Events Loaded');
  const Events = Object.values(Constants.Events)

  (await pG(`${process.cwd()}/events/*/*.js`)).map(async (file) => {
    const event = require(file)

    if (!Events.includes(event.name) || !event.name) {
      const L = file.split('/')
      await Table.addRow(`${event.name || 'MISSING'}`, `⛔ Event name is either invalid or missing: ${L[8] + '/' + L[9]}`)
      return
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client))
    } else {
      client.on(event.name, (...args) => event.execute(...args, client))
    };
    await Table.addRow(event.name, '✅ SUCCESSFUL')
  })
  console.log(Table.toString())
}
