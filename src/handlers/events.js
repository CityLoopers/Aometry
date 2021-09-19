const { readdirSync } = require('fs');

module.exports = (client) => {
    const eventFolders = readdirSync('./events');
    for (const folder of eventFolders) {
        const eventFiles = readdirSync(`./events/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            };
        };
    };
};