const { readdirSync } = require('fs');

module.exports = (client) => {
    const commandFolder = readdirSync('./cogs');
    for (const folder of commandFolder) {
        const commandFiles = readdirSync(`./cogs/${folder}`).filter(files => files.endsWith('.js'));
        const commandsArry = [];
        for (const file of commandFiles) {
            const command = require(`../cogs/${folder}/${file}`);
            client.commands.set(command.name, command);
            commandsArry.push(command);

            client.on("ready", () => {
                client.guilds.cache.get("882220041477709856").commands.set(commandsArry);
            });
        };
    };
};