async function loadCommands (client) {
  const { loadFiles } = require('../Utilities/fileLoader')
  const Ascii = require('ascii-table')
  const table = new Ascii('Commands Loaded').setHeading('Command', 'Status')

  await client.commands.clear()
  await client.subCommands.clear()

  const commandsArray = []

  const files = await loadFiles('modules')

  files.forEach((file) => {
    const command = require(file)

    if (command.subCommands) { return client.subCommands.set(command.subCommand, command) }

    if (!command.data) { return console.warn(`[WARN] Command ${file} is missing a data property.`) }

    client.commands.set(command.data.name, command)

    commandsArray.push(command.data.toJSON())

    table.addRow(command.data.name, '✅')
  })
  client.application.commands.set(commandsArray)
  return console.log(table.toString(), `\nCommands loaded: ${files.length}`)
}

module.exports = { loadCommands }
