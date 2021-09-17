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
            .setAuthor('Aometry Help Menu', client.user.displayAvatarURL({ dynamic: true }))
            .setDescription('*List of Commands:*')
            .addField('a!help', 'Aliases: `a!support`, `a!ticket`\nDisplays this help message.')
            .addField('a!ping', 'Aliases: `a!latency`, `a!lag`\nShows the latency between you and the bot.\nPermissions: ADMINISTRATOR')
            .addField('a!avatar', 'Aliases: `a!pfp`\nDisplays the avatar of the mentioned user or the message author.\nUsage: `a!avatar')
            .addField('a!userinfo', 'Aliases: `a!ui`, `a!whois`\nDisplays user information of the mentioned user or the message author.\nUsage: `a!userinfo [user]`')
            .addField('a!emitadd', 'Simulates a user joining the server')
            .addField('a!emitremove', 'Simulates a user leaving the server')
            .setFooter('Aometry v21.09.01c');
        message.channel.send({ embeds: [Response] });
    }
}