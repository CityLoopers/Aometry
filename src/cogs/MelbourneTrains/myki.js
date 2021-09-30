const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const { description } = require('../Support/ticket');
module.exports = {
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
     name: 'myki',
     description: 'Displays Myki Information',
    async execute (interaction, client){
        const myki = new MessageEmbed()
        .setColor('#C2D840')
        .setTitle(`${interaction.user.username}'s Myki Balance`)
        .setDescription('Information Coming Soon!')
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true}))
        .addFields([
            {
              "name": "Balance",
              "value": "$0.00",
              "inline": true
            },
            {
              "name": "Expiry",
              "value": "Never",
              "inline": true
            },
            {
              "name": "Card Type",
              "value": "Adult",
              "inline": true
            },
            {
              "name": "Topup Pending",
              "value": "$0.00",
              "inline": true
            }
          ]

        )
        .setTimestamp()

        interaction.reply({embeds: [myki]})

    }
}