const { CommandInteraction, MessageEmbed } = require('discord.js');
const utils = require('../../utils');
const cheerio = require('cheerio');

/*const lgaList = Object.keys(stations).map(code => ({
    name: stations[code],
    value: code
}))*/
module.exports = {
    name: 'covid',
    description: 'Show covid information in various forms.',
    options: [{
        name: 'state',
        description: 'Display Covid information about the specified state',
        type: 'SUB_COMMAND',
        options: [{
            name: 'state',
            description: 'Display covid information about the specified state',
            type: 'STRING',
            required: true,
            choices: [{
                name: 'Australia',
                value: 'AU',
            }, {
                name: 'Australian Capital Territory',
                value: 'ACT',
            }, {
                name: 'New South Wales',
                value: 'NSW',
            }, {
                name: 'Northern Territory',
                value: 'NT',
            }, {
                name: 'Queensland',
                value: 'QLD',
            }, {
                name: 'South Australia',
                value: 'SA',
            }, {
                name: 'Tasmania',
                value: 'TAS',
            }, {
                name: 'Victoria',
                value: 'VIC',
            }, {
                name: 'Western Australia',
                value: 'WA',
            }]
        }]
    }, {
        name: 'lga',
        description: 'Display information about the specified VIC LGA',
        type: 'SUB_COMMAND',
        options: [{
            name: 'lga',
            description: 'Choose an LGA to display',
            type: 'STRING',
            required: true,
        }]
    }],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction) {
        let sub = interaction.options.getSubcommand(['state', 'lga']);


        switch (sub) {
            case 'state':
                let stateData = utils.request('https://www.coronavirus.vic.gov.au/victorian-coronavirus-covid-19-data')
                let $ = cheerio.load(stateData);
                let dailyCases $('.ch-daily-update .ch-daily-update__statistics-item:nth-child(1)')
                let stateName = interaction.options.getString('state');
                const stateResponse = new MessageEmbed()
                    .setColor('PURPLE')
                    .setAuthor('Covid Information', 'https://i.imgur.com/5OJw0j7.png')
                    .setTitle(`${stateName} COVID Information`)
                    .setThumbnail('https://i.imgur.com/5OJw0j7.png')
                    .setDescription('Still working on this command...')
                    .setFields([{
                            "name": "Total Cases",
                            "value": "41,128",
                            "inline": true
                        },
                        {
                            "name": "Active Cases",
                            "value": "11,785",
                            "inline": true
                        }, {
                            "name": "Total Deaths",
                            "value": "869",
                            "inline": true
                        }, {
                            "name": "New Cases last 24h",
                            "value": `${dailyCases}`,
                            "inline": true
                        },
                        {
                            "name": "Tests last 24h",
                            "value": "71,275",
                            "inline": true
                        },
                        {
                            "name": "Deaths Last 24h",
                            "value": "3",
                            "inline": true
                        },
                        {
                            "name": "Vaccine Doses last 24h",
                            "value": "36,248",
                            "inline": true
                        },


                        {
                            "name": "Total Vaccine Doses",
                            "value": "3,641,164",
                            "inline": true
                        },
                        {
                            "name": "% Fully Vaccinated (16+)",
                            "value": "51.9%",
                            "inline": true
                        }
                    ], )
                    .setTimestamp()
                    .setFooter('Data From VicGovDH')
                interaction.reply({ embeds: [stateResponse] });
                break;

            case 'lga':
                let lgaName = interaction.options.getString('lga');
                const lgaResponse = new MessageEmbed()
                    .setColor('PURPLE')
                    .setAuthor('Covid Information', 'https://i.imgur.com/5OJw0j7.png')
                    .setTitle(`${lgaName} COVID Information`)
                    .setThumbnail('https://i.imgur.com/5OJw0j7.png')
                    .setDescription(`Information for ${lgaName}\n Still working on this command...`)
                    .setFields([{
                            "name": "Population",
                            "value": "233,471",
                            "inline": true
                        },
                        {
                            "name": "New Cases last 24h",
                            "value": "265",
                            "inline": true
                        },
                        {
                            "name": "Active Cases",
                            "value": "3,234",
                            "inline": true
                        },
                        {
                            "name": "Total Cases",
                            "value": "7,075",
                            "inline": true
                        }

                    ])

                interaction.reply({ embeds: [lgaResponse] })
                break;
        }
    }

}