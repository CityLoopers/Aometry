const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ping',
    description: "Returns the clients ping",
    permission: "ADMINISTRATOR",
    execute(client, interaction) {
        const Response = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`🏓 ${client.ws.ping}ms`);
        interaction.followUp({ embeds: [Response] });
    }
}