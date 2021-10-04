/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { CommandInteraction, MessageEmbed } = require('discord.js')
const utils = require('../../utils')
const cheerio = require('cheerio')

const covidDataHandlers = {
  VIC: async () => {
    const vicCases = await utils.request('https://www.coronavirus.vic.gov.au/victorian-coronavirus-covid-19-data')
    const vicVaccines = await utils.request('https://www.coronavirus.vic.gov.au/covid-19-vaccine-data')
    const vaccineData = await utils.request('https://www.coronavirus.vic.gov.au')
    const $ = cheerio.load(vicCases)
    const $$ = cheerio.load(vicVaccines)
    const $$$ = cheerio.load(vaccineData)

    const dailyLocalCases = $('.app-content .rpl-col:nth-child(2) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
    const dailyIntlCases = $('.app-content .rpl-col:nth-child(2) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    const activeCases = $('.app-content .rpl-col:nth-child(2) .ch-daily-update .ch-daily-update__statistics-item:nth-child(3) .ch-daily-update__statistics-item-text').text()

    const dailyTests = $('.app-content .rpl-col:nth-child(3) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
    const totalTests = $('.app-content .rpl-col:nth-child(3) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    const totalCases = $('.app-content .rpl-col:nth-child(3) .ch-daily-update .ch-daily-update__statistics-item:nth-child(3) .ch-daily-update__statistics-item-text').text()

    const dailyDeaths = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
    const totalDeaths = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    const recovered = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(3) .ch-daily-update__statistics-item-text').text()

    const dailyDose1 = $$('.app-content .rpl-col:nth-child(1) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
    const dailyDose2 = $$('.app-content .rpl-col:nth-child(1) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    const totalDose2 = $$('.app-content .rpl-col:nth-child(1) .ch-daily-update .ch-daily-update__statistics-item:nth-child(5) .ch-daily-update__statistics-item-text').text()
    const totalDoses = $$('.app-content .rpl-col:nth-child(1) .ch-daily-update .ch-daily-update__statistics-item:nth-child(6) .ch-daily-update__statistics-item-text').text()

    const updatedAt = $('.app-content .rpl-col:nth-child(1)').text().slice(9)
    const updatedMoment = utils.parseTime(updatedAt, 'DD MMM YYYY hh:mma').toDate()

    const vicPopulation = 4845711
    const dosePercentage = (parseInt(totalDoses.replace(/,/g, '')) / vicPopulation * 100).toFixed(1)
    const vaccinePercentage = $$$('#rpl-main-content > div > div > div > div > div:nth-child(6) > div > div > div.ch-daily-update__left > div > div.ch-daily-update__statistics-items > div > div:nth-child(3) > div > div.ch-daily-update__statistics-item-text').text()

    return {
      fields: [{
        name: 'Total Cases',
        value: totalCases,
        inline: true
      }, {
        name: 'Active Cases',
        value: activeCases,
        inline: true
      }, {
        name: 'Total Deaths',
        value: totalDeaths,
        inline: true
      }, {
        name: 'New Local Cases (Last 24h)',
        value: dailyLocalCases,
        inline: true
      }, {
        name: 'Tests (Last 24h)',
        value: dailyTests,
        inline: true
      }, {
        name: 'Deaths (Last 24h)',
        value: dailyDeaths,
        inline: true
      }, {
        name: 'Total Deaths',
        value: totalDeaths,
        inline: true
      }, {
        name: 'Recovered',
        value: recovered,
        inline: true
      }, {
        name: 'Vaccine Dose 1 (Last 24h)',
        value: dailyDose1,
        inline: true
      }, {
        name: 'Vaccine Dose 2 (Last 24h)',
        value: dailyDose2,
        inline: true
      }, {
        name: 'Total Vaccine Doses',
        value: totalDoses,
        inline: true
      }, {
        name: '% Fully Vaccinated (16+)',
        value: vaccinePercentage,
        inline: true
      }],
      updatedTime: updatedMoment,
      footer: 'Data from VicGovDH'
    }
  },
  NSW: async () => {
    const nswData = await utils.request('https://www.health.nsw.gov.au/Infectious/covid-19/Pages/default.aspx')
    // let data2 = await utils.request('https://www.health.nsw.gov.au/Infectious/covid-19/Pages/stats-nsw.aspx')
    const $ = cheerio.load(nswData)
    // let $$ = cheerio.load(data2)

    const newCases = $('#landing > div:nth-child(2) > ul > li:nth-child(4) > span').text()
    const activeCases = $('#landing > div:nth-child(2) > ul > li:nth-child(6) > span').text()

    const dailyTests = $('#landing > div:nth-child(2) > ul > li:nth-child(5) > span').text()
    // let totalTests = $('.app-content .rpl-col:nth-child(3) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
    // let totalCases = $$("#case > ul > li:nth-child(4) > span.number").text()

    /* let dailyDeaths = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(1) .ch-daily-update__statistics-item-text').text()
         let totalDeaths = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(2) .ch-daily-update__statistics-item-text').text()
         let recovered = $('.app-content .rpl-col:nth-child(4) .ch-daily-update .ch-daily-update__statistics-item:nth-child(3) .ch-daily-update__statistics-item-text').text() */

    // let dailyDose1 = $$("#ContentHtml1Zone2 > div:nth-child(3) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()
    // let dailyDose2 = $$("#ContentHtml1Zone2 > div:nth-child(3) > div > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()
    const totalDoses = $('#landing > div.statistics.vax > ul > li:nth-child(4) > span').text()
    const percentDose1 = $('#landing > div.statistics.vax > ul > li:nth-child(5) > span').text()
    const percentDose2 = $('#landing > div.statistics.vax > ul > li:nth-child(6) > span').text()

    const updatedAt = $('#maincontent > div.sixteen.columns.maincontent > div:nth-child(7) > div > div.lastupdated').text().slice(9)
    const updatedMoment = utils.parseTime(updatedAt, 'DD MMM YYYY hh:mma').toDate()

    const vicPopulation = 4845711

    return {
      fields: [
        /* {
                                "name": "Total Cases",
                                "value": totalCases,
                                "inline": true
                            }, */
        {
          name: 'Active Cases',
          value: activeCases,
          inline: true
        },
        /* {
                                    "name": "Total Deaths",
                                    "value": totalDeaths,
                                    "inline": true
                                }, */
        {
          name: 'New Cases (Last 24h)',
          value: newCases,
          inline: true
        }, {
          name: 'Tests (Last 24h)',
          value: dailyTests,
          inline: true
        },
        /* {
                                    "name": "Deaths (Last 24h)",
                                    "value": 'No Data',
                                    "inline": true
                                }, {
                                    "name": "Total Deaths",
                                    "value": 'No Data',
                                    "inline": true
                                }, {
                                    "name": "Recovered",
                                    "value": 'No Data',
                                    "inline": true
                                }, {
                                    "name": "Vaccine Dose 1 (Last 24h)",
                                    "value": dailyDose1,
                                    "inline": true
                                }, {
                                    "name": "Vaccine Dose 2 (Last 24h)",
                                    "value": dailyDose2,
                                    "inline": true
                                }, */
        {
          name: 'Total Vaccine Doses',
          value: totalDoses,
          inline: true
        }, {
          name: '% Fully Vaccinated (16+)',
          value: percentDose2,
          inline: true
        }
      ],
      updatedTime: updatedMoment,
      footer: 'Data from NSW Health'
    }
  }
}

/* const lgaList = Object.keys(stations).map(code => ({
name: stations[code],
value: code
})) */
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
        value: 'AU'
      }, {
        name: 'Australian Capital Territory',
        value: 'ACT'
      }, {
        name: 'New South Wales',
        value: 'NSW'
      }, {
        name: 'Northern Territory',
        value: 'NT'
      }, {
        name: 'Queensland',
        value: 'QLD'
      }, {
        name: 'South Australia',
        value: 'SA'
      }, {
        name: 'Tasmania',
        value: 'TAS'
      }, {
        name: 'Victoria',
        value: 'VIC'
      }, {
        name: 'Western Australia',
        value: 'WA'
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
      required: true
    }]
  }],
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  async execute (interaction) {
    const sub = interaction.options.getSubcommand(['state', 'lga'])

    switch (sub) {
      case 'state':
        const stateName = interaction.options.getString('state')
        if (covidDataHandlers[stateName]) {
          const data = await utils.getData('covid', stateName, covidDataHandlers[stateName], 1000 * 60 * 10)

          const stateResponse = new MessageEmbed()
            .setColor('PURPLE')
            .setAuthor('Covid Information', 'https://i.imgur.com/5OJw0j7.png')
            .setTitle(`${stateName} COVID Information`)
            .setThumbnail('https://i.imgur.com/5OJw0j7.png')
            .setFields(data.fields)
            .setTimestamp(data.updatedTime)
            .setFooter(data.footer)
          interaction.reply({ embeds: [stateResponse] })
        } else {
          interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('Support for that state is currently unavailable')] })
        }
        break

      case 'lga':
        const lgaName = interaction.options.getString('lga')
        const lgaResponse = new MessageEmbed()
          .setColor('PURPLE')
          .setAuthor('Covid Information', 'https://i.imgur.com/5OJw0j7.png')
          .setTitle(`${lgaName} COVID Information`)
          .setThumbnail('https://i.imgur.com/5OJw0j7.png')
          .setDescription(`Information for ${lgaName}\n Still working on this command...`)
        /*
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
*/
        interaction.reply({ embeds: [lgaResponse] })
        break
    }
  }

}
