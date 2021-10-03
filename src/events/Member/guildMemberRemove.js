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
                ownerDM.send(`Tried to send leave message and failed. Guild: ${guild.name}; A channel and message needs to be defined using /set-welcome`)
            } else if (data) {
                let welcomeChannelId = data.welcomeData.welcomeChannel;
                let welcomeMessage = data.welcomeData.welcomeMessage;
                let logsChannelId = data.logsChannel;

                const GoodBye = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(`Goodbye`, user.avatarURL({ dynamic: true, size: 512 }))
                    .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
                    .setDescription(`
            ${member} left **${guild.name}**\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**`)
                    .setFooter(`${user.tag}`)
                    .setTimestamp();
                let welcomeChannel = guild.channels.cache.get(welcomeChannelId);
                if (welcomeChannel) {
                    welcomeChannel.send({ embeds: [GoodBye] });
                } else {
                    ownerDM.send(`Tried to send leave message and failed. Guild: ${guild.name}; A channel and message needs to be defined using /set-welcome`)
                }

                const LogEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`${member} left :(`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();

                let logsChannel = guild.channels.cache.get(logsChannelId);
                if (logsChannel) {
                    logsChannel.send({ embeds: [LogEmbed] });
                } else {
                    ownerDM.send(`Tried to send leave message and failed. Guild: ${guild.name}; A channel and message needs to be defined using /set-welcome`)
                }


            }
        })

        /*const Welcomer = new WebhookClient({
            id: '892739765806456834',
            token: 'urtpc4rUngjxIbrJplYN8Q0zq7hCkoV4G-heW_hfkZamtP2A4KlimimiNNoma8ePLjLg',
        //});*/


    }
}