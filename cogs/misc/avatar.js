const { Client, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Displays the mentioned user's avatar",
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
        const Target = interaction.options.getUser('target');

        const Response = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`${Target.tag}\'s Avatar`)
            .setImage(Target.displayAvatarURL({ dynamic: true }))
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

        interaction.followUp({ embeds: [Response] })

    }
}