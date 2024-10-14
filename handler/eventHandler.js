async function loadEvents (client) {
  const { loadFiles } = require('../Utilities/fileLoader')
  const Ascii = require('ascii-table')
  const table = new Ascii('Events Loaded').setHeading('Event', 'Status')

  await client.events.clear()

  const files = await loadFiles('events')

  files.forEach((file) => {
    const event = require(file)

    const execute = (...args) => event.execute(...args, client)
    client.events.set(event.name, execute)

    if (event.rest) {
      if (event.once) {
        client.rest.once(event.name, execute)
      } else {
        client.rest.on(event.name, execute)
      }
    } else {
      if (event.once) {
        client.once(event.name, execute)
      } else {
        client.on(event.name, execute)
      }
    }

    table.addRow(event.name, '✅ SUCCESSFUL')
  })
  return console.log(table.toString(), `\nEvents Loaded: ${files.length}`)
}

module.exports = { loadEvents }
