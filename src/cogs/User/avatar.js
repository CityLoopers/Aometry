const { Client, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Displays the mentioned user's avatar",
    options: [{
        name: "user",
        description: "Select a user.",
        type: "USER",
        required: true
    }, ],
    /**
     *  
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {
        const Target = interaction.options.getUser('user');

        const Response = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`${Target.tag}\'s Avatar`)
            .setImage(Target.displayAvatarURL({ dynamic: true }))
            .setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))

        interaction.reply({ embeds: [Response] })

    }
}