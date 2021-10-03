const { CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'guildid',
    description: 'Returns the guild ID associated with the guild',
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction) {
        interaction.reply({ embeds: [new MessageEmbed().setDescription(`${interaction.guildId}`)] });
    }
}