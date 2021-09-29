const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');

module.exports = {
    name: "guildMemberRemove",
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        const { user, guild } = member

        const Leaver = new WebhookClient({
            id: '892744261244682280',
            token: '9Zykt71FexGUtXJ9NwmBSyOQY7TN5h2HFNVsStzFQEgFUZzwVQ8u6FzNo5k3EBALJuJw',
        });
        const GoodBye = new MessageEmbed()
            .setColor('RED')
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            ${member} left **${guild.name}**\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**`)
            .setFooter(`ID: ${user.id}`)

        Leaver.send({ embeds: [GoodBye] });
    }
}