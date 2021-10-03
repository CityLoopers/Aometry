const { MessageEmbed, GuildMember } = require('discord.js');
const guildConfig = require('../../schemas/guildConfig')

module.exports = {
    /**
     * @param {GuildMember} member
     */
    name: "messageUpdate",
    async execute(oldMessage, newMessage, member) {
        if (oldMessage.author.bot) return;
        const ownerDM = await newMessage.guild.fetchOwner();
        const count = 1950;
        const Original = oldMessage.content.slice(0, count) + (oldMessage.content.length > count ? " ..." : "");
        const Edited = newMessage.content.slice(0, count) + (newMessage.content.length > count ? "..." : "");
        guildConfig.findOne({
            guildId: newMessage.guild.id,
        }, async(err, data) => {
            if (err) console.log(err);
            if (!data) {
                ownerDM.send(`Tried to send message eddited log and failed. Guild: ${newMessage.guild}; A channel needs to be defined using /set-log`)
            } else if (data) {
                let logsChannelId = data.logsChannel;
                let logsChannel = newMessage.guild.channels.cache.get(logsChannelId);

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
                }

            }
        })
    }
}