const { MessageEmbed, MessageManager } = require('discord.js');
const moment = require('moment');
const { execute } = require('../emitters/memberAdd');

module.exports = {
    name: "userinfo",
    description: "Displays User Information",
    options: [{
        name: "target",
        description: "Select a target.",
        type: "USER",
        required: true
    }, ],
    /**
     *  
     * @param {client} client 
     * @param {CommandInteraction} interaction 
     */
    execute(client, interaction) {
        const Target = interaction.options.getMember('target');

        const Response = new MessageEmbed()
            .setAuthor(`${Target.user.username}`, Target.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(Target.user.displayAvatarURL({ dynamic: true }))
            .setColor('YELLOW')
            .addField("UserID", `${Target.id}`, false)
            .addField("Roles", `${Target.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
            .addField("Member Since", `${moment(Target.joinedAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Target.joinedAt).startOf('day').fromNow()}`)
            .addField("Discord User Since", `${moment(Target.user.createdAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Target.user.createdAt).startOf('day').fromNow()}`)
        message.reply({ embeds: [Response] })
    }
}