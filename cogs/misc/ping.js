const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ping',
    description: "Returns the clients ping",
    execute(client, interaction) {
        const Response = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`🏓 ${client.ws.ping}ms`);
        interaction.followUp({ embeds: [Response] });
    }
}