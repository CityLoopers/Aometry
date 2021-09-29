const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['pfp'],
    description: "Sends the avatar ping!",
    cooldown: 5,
    execute(message, args, commandName, client, Discord) {
        const Target = message.mentions.users.first() || message.author;

        const Response = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`${Target.tag}\'s Avatar`)
            .setImage(Target.displayAvatarURL({ dynamic: true }))
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        message.reply({ embeds: [Response] });
    }
}