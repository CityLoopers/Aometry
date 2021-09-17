const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "guildMemberRemove",
    execute(member) {
        const WelcomeEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`Goodbye 😢`)
            .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
            .setDescription(`${member.user.tag} left the **${member.guild.name}** server.\nLatest Member Count: **${member.guild.memberCount}**`)
            .setFooter(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        member.guild.channels.cache.get('888054076372312065').send({ content: `${member}`, embeds: [WelcomeEmbed] });

        const LogEmbed = new MessageEmbed()
            .setColor('RED')
            .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
            .setDescription(`${member.user.tag} left the server.`)
            .setTimestamp();

        member.guild.channels.cache.get('888053739406118922').send({ embeds: [LogEmbed] });
    }
}