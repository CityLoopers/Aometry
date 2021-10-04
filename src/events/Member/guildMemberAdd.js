const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');
const db = require('quick.db')


module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    async execute(member) {
        const { user, guild } = member
        const ownerDM = await guild.fetchOwner();
        const guildConfig = new db.table(`guildConfig_${guild.id}`)

        guildConfig.get('guildId')

        let welcomeChannelId = guildConfig.get('welcomeChannel') || ownerDM.send(`Tried to send a welcome message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`);
        let welcomeMessage = guildConfig.get('welcomeMessage');
        let logsChannelId = guildConfig.get('logsChannel') || ownerDM.send(`Tried to send a logs message but no channel was defined. Please use \`/guild-config\` in the guild: ${guild}`);

        const Welcome = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`🎉 Welcome! 🎉`, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`Welcome ${member} to **${guild.name}**!\nLatest Member Count: **${guild.memberCount}**`)
            .setFooter(`${user.tag}`)
            .setTimestamp();
        if (typeof welcomeChannelId === 'string') {
            let welcomeChannelName = guild.channels.cache.get(welcomeChannelId);
            welcomeChannelName.send({ embeds: [Welcome] });
        } else {
            welcomeChannelId
        }

        const LogEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(user.displayAvatarURL)
            .setDescription(`${member} joined the server.`)
            .addField(`Account Created`, `<t:${parseInt(user.createdTimestamp / 1000)}:R>`)
            .setTimestamp();

        if (typeof logsChannelId === 'string') {
            let logsChannel = guild.channels.cache.get(logsChannelId);
            logsChannel.send({ embeds: [LogEmbed] });
        } else {
            logsChannelId
        }


    }
}