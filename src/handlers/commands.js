const { Perms } = require('../validation/Permissions');
const { Client, ClientUser } = require('discord.js');
const { promisify } = require("util");
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

/**
 * @param {Client} client
 */

module.exports = async(client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${process.cwd()}/modules/*/*.js`)).map(async(file) => {
        const command = require(file);

        if (!command.name)
            return Table.addRow(file.split("/")[9], "🔶 FAILED", "Missing a name.")

        if (!command.description)
            return Table.addRow(command.name, "🔶 FAILED", "Missing a description.")

        if (command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return Table.addRow(command.name, "🔶 FAILED", "Invalid Permissions")
        }
        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCCESSFUL")
    });
    console.log(Table.toString());

    //PERMISSIONS CHECK//

    client.on("ready", async() => {
        const guildSupport = await client.guilds.cache.get('882220041477709856');
        const guildTest = await client.guilds.cache.get('893392409088643124');
        const guildEnroute = await client.guilds.cache.get('636354429049896991');

        guildSupport.commands.set(CommandsArray).then(async(command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;

                return guildSupport.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, { id: r.id, type: "ROLE", permission: true }]
                }, [])

                return [...accumulator, { id: r.id, permissions }]
            }, [])

            await guildSupport.commands.permissions.set({ fullPermissions })
        })
        guildTest.commands.set(CommandsArray).then(async(command) => {
                const Roles = (commandName) => {
                    const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                    if (!cmdPerms) return null;

                    return guildTest.roles.cache.filter((r) => r.permissions.has(cmdPerms));
                }

                const fullPermissions = command.reduce((accumulator, r) => {
                    const roles = Roles(r.name);
                    if (!roles) return accumulator;

                    const permissions = roles.reduce((a, r) => {
                        return [...a, { id: r.id, type: "ROLE", permission: true }]
                    }, [])

                    return [...accumulator, { id: r.id, permissions }]
                }, [])

                await guildTest.commands.permissions.set({ fullPermissions })
            })
            /* guildEnroute.commands.set(CommandsArray).then(async(command) => {
                 const Roles = (commandName) => {
                     const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                     if (!cmdPerms) return null;

                     return guildEnroute.roles.cache.filter((r) => r.permissions.has(cmdPerms));
                 }

                 const fullPermissions = command.reduce((accumulator, r) => {
                     const roles = Roles(r.name);
                     if (!roles) return accumulator;

                     const permissions = roles.reduce((a, r) => {
                         return [...a, { id: r.id, type: "ROLE", permission: true }]
                     }, [])

                     return [...accumulator, { id: r.id, permissions }]
                 }, [])

                 await guildEnroute.commands.permissions.set({ fullPermissions })
             })*/
    })



}