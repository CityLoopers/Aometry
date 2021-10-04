/* eslint-disable max-len */
const { Events } = require('../validation/EventNames')
const { promisify } = require('util')
const { glob } = require('glob')
const pG = promisify(glob)
const Ascii = require('ascii-table')

module.exports = async (client) => {
  const Table = new Ascii('Events Loaded');

  (await pG(`${process.cwd()}/events/*/*.js`)).map(async (file) => {
    const event = require(file)

    if (!Events.includes(event.name) || !event.name) {
      const L = file.split('/')
      await Table.addRow(`${event.name || 'MISSING'}`, `⛔ Event name is either invalid or missing: ${L[6] + '/' + L[7]}`)
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
