const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "messageUpdate",
    execute(oldMessage, newMessage) {
        if (oldMessage.author.bot) return;

        const count = 1950;
        const Original = oldMessage.content.slice(0, count) + (oldMessage.content.length > count ? " ..." : "");
        const Edited = newMessage.content.slice(0, count) + (newMessage.content.length > count ? "..." : "");
        let logsChannel = newMessage.channel.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `logs`);

        const logEmbed = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle(` ✏️ Message Edited`)
            .setDescription(`[Message](${newMessage.url}) in ${newMessage.channel} has been edited by ${newMessage.author}.
        \n
        **Original**: \`\`\`${Original}\`\`\`
        **Edited**: \`\`\`${Edited}\`\`\``)
            .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
            .addField('Message Link', `[Click Here](${newMessage.url})`)
            .setTimestamp()
        if (newMessage.attachments.size > 0) {
            logEmbed.addField(`Attachments:`, `${newMessage.attachments.map((a) => a.url)}`, true)
        }
        if (logsChannel) {
            logsChannel.send({ embeds: [logEmbed] });
        } else {
            console.log(`Tried to send message edited log and failed. Guild: ${newMessage.guild} a channel named #logs needs to be created!`)
        }
    }
}