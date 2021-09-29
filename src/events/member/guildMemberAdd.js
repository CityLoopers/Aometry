const { MessageEmbed } = require('discord.js');
const moment = require('moment');
module.exports = {
    name: "guildMemberAdd",
    execute(member) {

        const WelcomeEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`🎉 WELCOME 🎉`)
            .setDescription(`Welcome ${member} to the **${member.guild.name}** server!\nLatest Member Count: **${member.guild.memberCount}**`)
            .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
            .setFooter(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        member.guild.channels.cache.get('888054076372312065').send({ content: `${member}`, embeds: [WelcomeEmbed] });

        const LogEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${member} just joined the server!`)
            .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
            .addFields({
                name: "Account Created",
                value: moment(member.user.createdAt).format('Do MMMM YYYY, h:mm:ss a'),
                inline: true
            })
            .setTimestamp();

        member.guild.channels.cache.get('887672604054405120').send({ embeds: [LogEmbed] });

    }
}