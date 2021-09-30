const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const mykiCard = require('../../schemas/myki')
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
        options: [{
            name: 'card-number',
            description: 'Enter your card number',
            type: 'STRING',
            required: true,
        }]
    }, {
        name: 'balance',
        description: 'Check your account balance',
        type: 'SUB_COMMAND',
    }],
    async execute(interaction, client) {
        let mykiBalance = '$0.00'
        let mykiExpiry = 'Never'
        let mykiType = 'Adult'
        let topupPending = '$0.00'
        let user = interaction.user.id;
        const Sub = interaction.options.getSubcommand(['register', 'balance']);

        if (Sub === 'register') {
            /*mykiCard.findOne({
                userId: user
            })*/
            const mykiRegister = new MessageEmbed()
                .setColor('#C2D840')
                .setTitle('Myki Registered!')
                .setDescription(`Thank you for registering your myki! ${interaction.user}`)
                .setTimestamp()

            interaction.reply({ embeds: [mykiRegister] })
        } else if (Sub === 'balance') {
            const mykiBalanceEmbed = new MessageEmbed()
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

            interaction.reply({ embeds: [mykiBalanceEmbed] })
        }


    }
}