const {
    Client,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js')

module.exports = {
    name: 'pid',
    description: 'Displays the selected PID',
    options: [{
        name: 'pid-type',
        description: 'Select the PID type to display',
        type: 'STRING',
        required: true,
        choices: [{
                name: 'FSS Escalator',
                value: 'fss-escalator'
            },
            {
                name: 'FSS Platform',
                value: 'fss-platform'
            },
            {
                name: 'Trains from FSS',
                value: 'trains-from-fss'
            },
            {
                name: 'Half Platform',
                value: 'half-platform'
            },
            {
                name: 'Half Platform Bold',
                value: 'half-platform-bold'
            },
            {
                name: 'Platform',
                value: 'platform'
            }, {
                name: 'Pre-Platform Vertical',
                value: 'pre-platform-vertical'
            }, {
                name: 'SSS Platform',
                value: 'sss-platform'
            }, {
                name: 'SSS Platform New',
                value: 'sss-platform-new'
            }, {
                name: 'SSS Coach New',
                value: 'sss-coach-new'
            }, {
                name: 'Concourse Up Down',
                value: 'conc-up-down'
            }, {
                name: 'Concourse Interchange',
                value: 'conc-interchange'
            }, {
                name: '2-line LED',
                value: '2-line-led'
            }, {
                name: 'CRT',
                value: 'crt'
            }, {
                name: 'V/Line Half Platform',
                value: 'vline-half-platform'
            },
        ],
    }, {
        name: 'station',
        description: 'Choose a station',
        type: 'STRING',
        required: true,
        choices: [{
            name: 'Station Name 1',
            value: 'stationcode1',
        }, {
            name: 'Station Name 2',
            value: 'stationcode2',
        }]
    }, {
        name: 'platform',
        description: 'Choose a platform',
        type: 'NUMBER',
        required: false,
    }],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const pidOption = interaction.options.getString('pid-type');
        const stationOption = interaction.options.getString('station');
        const platformNumber = interaction.options.getNumber('platform') || '*';
        const response = new MessageEmbed()
            .setTitle('PID')
            .setDescription(`Still working on this command. You selected the **${pidOption}** PID for **${stationOption}** Platform ${platformNumber}`)
        interaction.reply({ embeds: [response] })
    }
}