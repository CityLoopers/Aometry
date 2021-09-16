const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    //this command is broken please don't use it <3 I will fix it tomorrow (17/09/2021)
    name: "userinfo",
    description: "Displays User Information",
    execute(message, args, commandName, client, Discord) {
        const Target = message.mentions.users.first() || message.author;

        const Response = new MessageEmbed()
            .setAuthor(`${Target.username}`, Target.displayAvatarURL({ dynamic: true }))
            .setThumbnail(Target.displayAvatarURL({ dynamic: true }))
            .setColor('YELLOW')
            .addField("UserID", `${Target.id}`, false)
            .addField("Roles", `${Target.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
            .addField("Member Since", `${moment(Target.joinedAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Target.joinedAt).startOf('day').fromNow()}`)
            .addField("Discord User Since", `${moment(Target.user.createdAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Target.user.createdAt).startOf('day').fromNow()}`)
        message.reply({ embeds: [Response] })
    }
}