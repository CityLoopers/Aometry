const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    //this command is broken please don't use it <3 I will fix it tomorrow (17/09/2021)
    name: "userinfo",
    aliases: ['ui', 'whois'],
    description: "Displays User Information",
    execute(message, args, commandName, client, Discord) {
        const Target = message.mentions.users.first() || message.author;
        const Member = message.guild.members.cache.get(Target.id);

        const Response = new MessageEmbed()
            .setAuthor(`${Target.username}`, Target.displayAvatarURL({ dynamic: true }))
            .setThumbnail(Target.displayAvatarURL({ dynamic: true }))
            .setColor('YELLOW')
            .addField("UserID", `${Target.id}`, false)
            .addField("Roles", `${Member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
            .addField("Member Since", `${moment(Member.joinedAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}`)
            .addField("Discord User Since", `${moment(Target.createdAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Target.createdAt).startOf('day').fromNow()}`)
        message.reply({ embeds: [Response] })
    }
}