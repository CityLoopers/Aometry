const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');
const guildConfig = require('../../schemas/guildConfig')

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    async execute(member) {
        const { user, guild } = member
        const ownerDM = await guild.fetchOwner();

        /* guildConfig.findOne({ 
             guildId: interaction.guildId
         })*/
        guildConfig.findOne({
            guildId: guild.id,
        }, async(err, data) => {
            if (err) console.log(err);
            if (!data) {
                ownerDM.send(`Tried to send welcome message and failed. Guild: ${guild.name}; A channel and message needs to be defined using /set-welcome`)
            } else if (data) {
                let welcomeChannelId = data.welcomeData.welcomeChannel || '';
                let welcomeMessage = data.welcomeData.welcomeMessage || '';
                let logsChannelId = data.logsChannel || '';

                const Welcome = new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(`🎉 Welcome! 🎉`, user.avatarURL({ dynamic: true, size: 512 }))
                    .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
                    .setDescription(`
            Welcome ${member} to **${guild.name}**!\n
            Latest Member Count: **${guild.memberCount}**`)
                    .setFooter(`${user.tag}`)
                    .setTimestamp();
                let welcomeChannelName = guild.channels.cache.get(welcomeChannelId);
                welcomeChannelName.send({ embeds: [Welcome] });

                const LogEmbed = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(user.displayAvatarURL)
                    .setDescription(`${member} joined the server.`)
                    .addField(`Account Created`, `<t:${parseInt(user.createdTimestamp / 1000)}:R>`)
                    .setTimestamp();

                let logsChannel = guild.channels.cache.get(logsChannelId);
                if (logsChannel) {
                    logsChannel.send({ embeds: [LogEmbed] });
                } else {
                    ownerDM.send(`Tried to send welcome message and failed. Guild: ${guild.name}; A channel and message needs to be defined using /set-welcome`)
                }


            }
        })

        /*const Welcomer = new WebhookClient({
            id: '892739765806456834',
            token: 'urtpc4rUngjxIbrJplYN8Q0zq7hCkoV4G-heW_hfkZamtP2A4KlimimiNNoma8ePLjLg',
        //});*/


    }
}