const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'botinfo',
    description: 'Provides information about Aometry',
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor(`About Aometry`, client.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setFields([{
                    "name": "Main Contributors",
                    "value": "- Finneh\n- Eyeballcode\n- PixelAtom"
                },
                {
                    "name": "Support / Report Bug / Suggest a Feature",
                    "value": "[Join the Aometry Support Discord](https://discord.gg/HYWVSjJZud)\n[Github Issues](https://github.com/Enroute-Transport/Aometry/issues)"
                },
                {
                    "name": "Social",
                    "value": "[GitHub](https://github.com/Enroute-Transport/Aometry)\n[Website](https://gunzel.xyz)\n[Twitter](https://twitter.com/enrtme)\n[Enroute](https://discord.gg/Enroute)"
                }
            ])
            .setFooter('Aometry v21.10.01')

        let row = new MessageActionRow().addComponents(
            new MessageButton()
            .setURL("https://github.com/Enroute-Transport/Aometry")
            .setLabel("GitHub")
            .setStyle("LINK"),

            new MessageButton()
            .setURL("https://discord.gg/zturVQrhTG")
            .setLabel("Support Server")
            .setStyle("LINK"),

            new MessageButton()
            .setURL("https://gunzel.xyz")
            .setLabel("Aometry Website")
            .setStyle("LINK"),

        );
        interaction.reply({ embeds: [Response], components: [row] });
    }
}