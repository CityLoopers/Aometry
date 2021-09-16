const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    execute(member) {

        const WelcomeEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`🎉 WELCOME 🎉`)
            .setDescription(`Welcome ${member} to the **${member.guild.name}** server!\nLatest Member Count: **${member.guild.memberCount}**`)
            .setFooter(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        member.guild.channels.cache.get('888054076372312065').send({ content: `${member}`, embeds: [WelcomeEmbed] });

        const LogEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${member} just joined the server!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        member.guild.channels.cache.get('888053739406118922').send({ embeds: [LogEmbed] });

    }
}