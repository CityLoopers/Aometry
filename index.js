const Discord = require('discord.js');
const { Intents, Collection } = Discord;
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INVITES
    ]
});
const { token } = require('./config.json');

client.commands = new Collection();
client.cooldowns = new Collection();

['eventsHandler', 'commandsHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.login(token);