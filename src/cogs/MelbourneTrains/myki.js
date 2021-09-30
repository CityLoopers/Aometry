const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
module.exports = {
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    name: 'myki',
    description: 'Displays Myki Information',
    options: [{
        name: 'register',
        description: 'Register your myki account',
        type: 'SUB_COMMAND',
    }],
    async execute(interaction, client) {
        let mykiBalance = '$0.00'
        let mykiExpiry = 'Never'
        let mykiType = 'Adult'
        let topupPending = '$0.00'
        let user = interaction.user.id;
        const myki = new MessageEmbed()
            .setColor('#C2D840')
            .setTitle(`${interaction.user.username}'s Myki Balance`)
            .setDescription('Information Coming Soon!')
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields([{
                        "name": "Balance",
                        "value": mykiBalance,
                        "inline": true
                    },
                    {
                        "name": "Expiry",
                        "value": mykiExpiry,
                        "inline": true
                    },
                    {
                        "name": "Card Type",
                        "value": mykiType,
                        "inline": true
                    },
                    {
                        "name": "Topup Pending",
                        "value": topupPending,
                        "inline": true
                    }
                ]

            )
            .setTimestamp()

        interaction.reply({ embeds: [myki] })

    }
}