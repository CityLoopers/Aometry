const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        const { user, guild } = member

        member.roles.add('882220566675882044');

        const Welcomer = new WebhookClient({
            id: '892739765806456834',
            token: 'urtpc4rUngjxIbrJplYN8Q0zq7hCkoV4G-heW_hfkZamtP2A4KlimimiNNoma8ePLjLg',
        });
        const Welcome = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`🎉 Welcome! 🎉`, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            Welcome ${member} to **${guild.name}**!\n
            Latest Member Count: **${guild.memberCount}**`)
            .setFooter(`${user.tag}`)
            .setTimestamp();

        Welcomer.send({ embeds: [Welcome] });

        const LogEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
            .setDescription(`${member} joined the server.`)
            .addField(`Account Created`, `<t:${parseInt(user.createdTimestamp / 1000)}:R>`)
            .setTimestamp();

        member.guild.channels.cache.get('888053739406118922').send({ embeds: [LogEmbed] });
    }
}