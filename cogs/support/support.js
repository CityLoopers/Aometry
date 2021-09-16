const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'support',
    aliases: ['help', 'ticket'],
    permissions: 'ADMINISTRATOR',
    description: "Sends the support message",
    cooldown: 5,
    execute(message, args, commandName, client, Discord) {
        const Response = new MessageEmbed()
            .setColor('YELLOW')
            .setDescription('List of Commands: `a!help`, `a!ping`');
        message.channel.send({ embeds: [Response] });
    }
}