const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'membercount',
    description: 'Count of members',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild } = interaction;
        const embed = new MessageEmbed()
            .setColor("YELLOW")
            .setAuthor(`Member Count of ${guild}`, guild.iconURL({ dynamic: true }))
            .setTitle("Members")
            .setDescription(`Total: ${guild.members.cache.size}\n Members: ${guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${guild.members.cache.filter(member => member.user.bot).size}`, true)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setFooter(`Requested by ${interaction.user.username}`)
            .setTimestamp()

        interaction.reply({ embeds: [embed] })
    }
}