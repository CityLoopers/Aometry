const { CommandInteraction, MessageEmbed } = require('discord.js');
const utils = require('../../utils');
const cheerio = require('cheerio');

let covidDataHandlers = {
  VIC: async () => {
    let vicCases = await utils.request('https://www.coronavirus.vic.gov.au/victorian-coronavirus-covid-19-data')
    let vicVaccines = await utils.request('https://www.coronavirus.vic.gov.au/covid-19-vaccine-data')
    let $ = cheerio.load(vicCases)
    let $$ = cheerio.load(vicVaccines)

    let dailyLocalCases = $('.app-content .rpl-col:nth-child(2) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
    let dailyIntlCases = $('.app-content .rpl-col:nth-child(2) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    let activeCases = $('.app-content .rpl-col:nth-child(2) .ch-daily-update .ch-daily-update__statistics-item:nth-child(3) .ch-daily-update__statistics-item-text').text()

    let dailyTests = $('.app-content .rpl-col:nth-child(3) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
    let totalTests = $('.app-content .rpl-col:nth-child(3) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    let totalCases = $('.app-content .rpl-col:nth-child(3) .ch-daily-update .ch-daily-update__statistics-item:nth-child(3) .ch-daily-update__statistics-item-text').text()

    let dailyDeaths = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
    let totalDeaths = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    let recovered = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(3) .ch-daily-update__statistics-item-text').text()

    let dailyDose1 = $$('.app-content .rpl-col:nth-child(1) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
    let dailyDose2 = $$('.app-content .rpl-col:nth-child(1) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    let totalDose2 = $$('.app-content .rpl-col:nth-child(1) .ch-daily-update .ch-daily-update__statistics-item:nth-child(5) .ch-daily-update__statistics-item-text').text()
    let totalDoses = $$('.app-content .rpl-col:nth-child(1) .ch-daily-update .ch-daily-update__statistics-item:nth-child(6) .ch-daily-update__statistics-item-text').text()

    let updatedAt = $('.app-content .rpl-col:nth-child(1)').text().slice(9)
    let updatedMoment = utils.parseTime(updatedAt, 'DD MMM YYYY hh:mma').toDate()

    let vicPopulation = 4845711

    return {
      fields: [{
        "name": "Total Cases",
        "value": totalCases,
        "inline": true
      }, {
        "name": "Active Cases",
        "value": activeCases,
        "inline": true
      }, {
        "name": "Total Deaths",
        "value": totalDeaths,
        "inline": true
      }, {
        "name": "New Local Cases (Last 24h)",
        "value": dailyLocalCases,
        "inline": true
      }, {
        "name": "Tests (Last 24h)",
        "value": dailyTests,
        "inline": true
      }, {
        "name": "Deaths (Last 24h)",
        "value": dailyDeaths,
        "inline": true
      }, {
        "name": "Total Deaths",
        "value": totalDeaths,
        "inline": true
      }, {
        "name": "Recovered",
        "value": recovered,
        "inline": true
      }, {
        "name": "Vaccine Dose 1 (Last 24h)",
        "value": dailyDose1,
        "inline": true
      }, {
        "name": "Vaccine Dose 2 (Last 24h)",
        "value": dailyDose2,
        "inline": true
      },  {
        "name": "Total Vaccine Doses",
        "value": totalDoses,
        "inline": true
      }, {
        "name": "% Fully Vaccinated (16+)",
        "value": (parseInt(totalDose2.replace(/,/g, '')) / 6648600 * 100).toFixed(1),
        "inline": true
      }],
      updatedTime: updatedMoment,
      footer: 'Data from VicGovDH'
    }
  }
}

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
        let stateName = interaction.options.getString('state');
        if (covidDataHandlers[stateName]) {
          let data = await utils.getData('covid', stateName, covidDataHandlers[stateName], 1000 * 60 * 10)

          const stateResponse = new MessageEmbed()
          .setColor('PURPLE')
          .setAuthor('Covid Information', 'https://i.imgur.com/5OJw0j7.png')
          .setTitle(`${stateName} COVID Information`)
          .setThumbnail('https://i.imgur.com/5OJw0j7.png')
          .setFields(data.fields)
          .setTimestamp(data.updatedTime)
          .setFooter(data.footer)
          interaction.reply({ embeds: [stateResponse] });
        } else {
          interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('Support for that state is currently unavailable')] })
        }
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
