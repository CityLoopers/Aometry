const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');
const guildConfig = require('../../schemas/guildConfig')

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        const { user, guild } = member

        /* guildConfig.findOne({ 
             guildId: interaction.guildId
         })*/
        let welcomeChannel = guild.channels.cache.find((channel) => channel.name.toLowerCase() === `welcome`)
        let logsChannel = guild.channels.cache.find((channel) => channel.name.toLowerCase() === `logs`)

        /*const Welcomer = new WebhookClient({
            id: '892739765806456834',
            token: 'urtpc4rUngjxIbrJplYN8Q0zq7hCkoV4G-heW_hfkZamtP2A4KlimimiNNoma8ePLjLg',
        //});*/
        const Welcome = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`🎉 Welcome! 🎉`, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            Welcome ${member} to **${guild.name}**!\n
            Latest Member Count: **${guild.memberCount}**`)
            .setFooter(`${user.tag}`)
            .setTimestamp();

        if (welcomeChannel) {
            welcomeChannel.send({ embeds: [Welcome] });
        } else {
            console.log(`Tried to send welcome message and failed. Guild: ${guild.name} a channel named #welcome needs to be created!`)
        }
        const LogEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(user.displayAvatarURL)
            .setDescription(`${member} joined the server.`)
            .addField(`Account Created`, `<t:${parseInt(user.createdTimestamp / 1000)}:R>`)
            .setTimestamp();

        if (logsChannel) {
            logsChannel.send({ embeds: [LogEmbed] });
        } else {
            console.log(`Tried to send welcome log and failed. Guild: ${guild.name} a channel named #logs needs to be created!`)
        }



    }
}