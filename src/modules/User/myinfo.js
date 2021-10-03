const { Client, MessageEmbed, CommandInteraction, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: "myinfo",
    description: "Displays the information that Aometry collects.",
    /**
     *  
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {

        const Response = new MessageEmbed()
            .setAuthor(`Aometry User Information`, client.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setColor('YELLOW')
            .setDescription('Aometry collects information about the user.\n\nThis bot stores some data about users as necessary to function.\n\n This is mostly the ID your user is assigned by Discord, linked to a handful of things depending on what you interact with in the bot. \n\nThere are a few commands which store it to keep track of who created something. (such as playlists)\n\n For full details about this as well as more in depth details of what is stored and why, see https://github.com/Enroute-Transport/Aometry/wiki/My-Data.')
            .setFooter('Aometry v21.10.01')

        let row = new MessageActionRow().addComponents(
            new MessageButton()
            .setURL("https://github.com/Enroute-Transport/Aometry/wiki/My-Data")
            .setLabel("Data Collection Information")
            .setStyle("LINK"), );

        interaction.reply({ embeds: [Response], components: [row] });
    }
};