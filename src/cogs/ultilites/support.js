const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "support",
    description: "Sends the support message",
    execute(client, interaction) {
        const Response = new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('Aometry Help', client.user.displayAvatarURL({ dynamic: true }))
            .setDescription('**Aometry v21.09.01c**\n`a!help` Displays this menu\n`a!ping` Displays the latency from you to the bot in ms\n`a!emitadd` Simulates a user joining the server\n`a!emitremove` Simulates a user leaving the server')
            .setFooter('https://gunzel.xyz');
        interaction.followUp({ embeds: [Response] });
    }
}