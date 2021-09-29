const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");

require("../../Events/Client/ready");

module.exports = {
    name: "status",
    description: "Displays the status of the bot and Database connection",
    permission: "ADMINISTRATOR",

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);





        const Response = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle('Aometry Status')
            .setDescription(
                `
        **Client**: \`🟢 Online!\`
        \n **Database**: \`${switchTo(connection.readyState)}\`
        \n **Client Ping**: \`${client.ws.ping}ms\`
        \n **Message Ping**: \` ${Date.now() - interaction.createdTimestamp} ms \`
        \n **Uptime**: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter('Aometry v21.10.01 (Canary)')

        interaction.reply({ embeds: [Response] });
    }
}


function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = `🔴 Disconnected!`
            break;
        case 1:
            status = `🟢 Connected!`
            break;
        case 2:
            status = `🟠 Connecting!`
            break;
        case 3:
            status = `🟠 Disconnecting!`
            break;
    }
    return status;
}