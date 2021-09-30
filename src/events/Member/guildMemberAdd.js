const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        const { user, guild } = member
        let welcomeChannel = guild.channels.cache.find((channel) => channel.name.toLowerCase() === `welcome`)
        let logsChannel = guild.channels.cache.find((channel) => channel.name.toLowerCase() === `logs`)

        //const Welcomer = new WebhookClient({
        //   id: '892739765806456834',
        //    token: 'urtpc4rUngjxIbrJplYN8Q0zq7hCkoV4G-heW_hfkZamtP2A4KlimimiNNoma8ePLjLg',
        //});
        const Welcome = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`🎉 Welcome! 🎉`, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            Welcome ${member} to **${guild.name}**!\n
            Latest Member Count: **${guild.memberCount}**`)
            .setFooter(`${user.tag}`)
            .setTimestamp();

        welcomeChannel.send({ embeds: [Welcome] });

        const LogEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
            .setDescription(`${member} joined the server.`)
            .addField(`Account Created`, `<t:${parseInt(user.createdTimestamp / 1000)}:R>`)
            .setTimestamp();

        logsChannel.send({ embeds: [LogEmbed] });
    }
}