const { readdirSync, read } = require('fs');

module.exports = (client, Discord) => {
    const commandFolder = readdirSync('./cogs');
    for (const folder of commandFolder) {
        const commandFiles = readdirSync(`./cogs/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../cogs/${folder}/${file}`);
            client.commands.set(command.name, command);
        };
    };
};