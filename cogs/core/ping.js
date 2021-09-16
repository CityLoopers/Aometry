const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['latency', 'lag'],
    permissions: 'ADMINISTRATOR',
    description: "Sends the client ping!",
    cooldown: 5,
    execute(message, args, commandName, client, Discord) {
        const Response = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`🏓 ${client.ws.ping}ms`);
        message.channel.send({ embeds: [Response] });
    }
}