const { Client, MessageEmbed, CommandInteraction } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "userinfo",
    description: "Displays User Information",
    options: [{
        name: "user",
        description: "Select a user.",
        type: "USER",
        required: false
    }, ],
    /**
     *  
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {
        const Target = interaction.options.getUser('user') || interaction.user;

        const Response = new MessageEmbed()
            .setAuthor(`${Target.user.username}`, Target.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(Target.user.displayAvatarURL({ dynamic: true }))
            .setColor('YELLOW')
            .addField("UserID", `${Target.user.id}`, false)
            .addField("Roles", `${Target.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
            .addField("Member Since", `${moment(Target.joinedAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Target.joinedAt).startOf('day').fromNow()}`)
            .addField("Discord User Since", `${moment(Target.user.createdAt).format('Do MMMM YYYY, h:mm:ss a')}\n**-** ${moment(Target.user.createdAt).startOf('day').fromNow()}`)
        interaction.reply({ embeds: [Response] })
    }
}