/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { Permissions } = require('discord.js')
module.exports = async (client, pG, Ascii) => {
  const Perms = Object.keys(Permissions.FLAGS)
  const Table = new Ascii('Prefix Commands Loaded')
  Table.setHeading('Command', 'Module', 'Status')

  const commandsArray = [];
  (await pG(`${process.cwd()}/modules/*/prefixCommands/*.js`)).map(async (file) => {
    const command = require(file)

    if (!command.name) {
      const L = file.split('/')
      return Table.addRow(`${L[8] + '/' + L[10]}`, '🔶 FAILED', 'Missing a name.')
    }

    if (!command.module) {
      return Table.addRow(command.name, '🔶 FAILED', 'Missing a module.')
    }

    if (!command.description) {
      return Table.addRow(command.name, '🔶 FAILED', 'missing a description.')
    }

    if (command.permission) {
      if (Perms.includes(command.permission)) {
        command.defaultPermission = false
      } else {
        return Table.addRow(command.name, '🔶 FAILED', 'Invalid Permissions')
      }
    }
    client.prefixCommands.set(command.name, command)
    commandsArray.push(command)

    await Table.addRow(command.name, command.module, '✅ SUCCESSFUL')
  })
  console.log(Table.toString())
}
