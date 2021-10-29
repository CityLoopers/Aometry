/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { Perms } = require('../validation/Permissions')
const { Client } = require('discord.js')

/**
 * @param {Client} client
 */

module.exports = async (client, pG, Ascii) => {
  const Table = new Ascii('Button Loaded')

  const buttonsArray = [];

  (await pG(`${process.cwd()}/modules/*/buttons/*.js`)).map(async (file) => {
    const button = require(file)

    if (!button.name) {
      return Table.addRow(file.split('/')[9], '🔶 FAILED', 'Missing a name.')
    }

    if (!button.description) {
      return Table.addRow(button.name, '🔶 FAILED', 'Missing a description.')
    }

    if (button.permission) {
      if (Perms.includes(button.permission)) {
        button.defaultPermission = false
      } else {
        return Table.addRow(button.name, '🔶 FAILED', 'Invalid Permissions')
      }
    }
    client.buttons.set(button.name, button)
    buttonsArray.push(button)

    await Table.addRow(button.name, '✅ SUCCESSFUL')
  })
  console.log(Table.toString())

  // PERMISSIONS CHECK//

  client.on('ready', async () => {
    client.guilds.cache.forEach((guild) => {
      guild.buttons.set(buttonsArray).then(async (button) => {
        const rolesConstructor = (buttonName) => {
          const btnPerms = buttonsArray.find((b) => b.name === buttonName).permission
          if (!btnPerms) return null

          return guild.roles.cache.filter((r) => r.permissions.has(btnPerms))
        }

        const fullPermissions = button.reduce((accumulator, r) => {
          const roles = rolesConstructor(r.name)
          if (!roles) return accumulator

          const permissions = roles.reduce((a, r) => {
            return [...a, { id: r.id, type: 'ROLE', permission: true }]
          }, [])

          return [...accumulator, { id: r.id, permissions }]
        }, [])

        await guild.buttons.permissions.set({ fullPermissions })
      })
    })
  })
}
