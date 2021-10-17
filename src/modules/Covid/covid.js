/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { CommandInteraction, MessageEmbed } = require('discord.js')
const utils = require('../../utils')
const cheerio = require('cheerio')

module.exports = {
  name: 'covid',
  description: 'Show covid information in various forms.',
  options: [{
    name: 'state',
    description: 'Display covid information about the specified state',
    type: 'STRING',
    required: true,
    choices: [{
      name: 'Australia',
      value: '0'
    }, {
      name: 'Australian Capital Territory',
      value: '7'
    }, {
      name: 'New South Wales',
      value: '1'
    }, {
      name: 'Northern Territory',
      value: '8'
    }, {
      name: 'Queensland',
      value: '3'
    }, {
      name: 'South Australia',
      value: '5'
    }, {
      name: 'Tasmania',
      value: '6'
    }, {
      name: 'Victoria',
      value: '2'
    }, {
      name: 'Western Australia',
      value: '4'
    }]
  }],
  /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  async execute (interaction) {
    const stateName = interaction.options.getString('state')

    const covidData = await utils.request('https://covidlive.com.au/covid-live.json')
    const obj = await JSON.parse(covidData)
    const newTest = obj[stateName].TEST_CNT - obj[stateName].PREV_TEST_CNT
    const newDeaths = obj[stateName].DEATH_CNT - obj[stateName].PREV_DEATH_CNT
    const newVaccine = obj[stateName].VACC_DOSE_CNT - obj[stateName].PREV_VACC_DOSE_CNT

    const stateResponse = new MessageEmbed()
      .setColor('PURPLE')
      .setAuthor('Covid Information', 'https://i.imgur.com/5OJw0j7.png')
      .setTitle(`${obj[stateName].CODE} COVID Information`)
      .setThumbnail('https://i.imgur.com/5OJw0j7.png')
      .setFields([{
        name: 'Total Cases',
        value: `${obj[stateName].CASE_CNT}`,
        inline: true
      }, {
        name: 'Active Cases',
        value: `${obj[stateName].ACTIVE_CNT}`,
        inline: true
      }, {
        name: 'Total Deaths',
        value: `${obj[stateName].DEATH_CNT}`,
        inline: true
      }, {
        name: 'New Local Cases (Last 24h)',
        value: `${obj[stateName].NEW_CASE_CNT}`,
        inline: true
      }, {
        name: 'Tests (Last 24h)',
        value: `${newTest}`,
        inline: true
      }, {
        name: 'Deaths (Last 24h)',
        value: `${newDeaths}`,
        inline: true
      }, {
        name: 'Recovered',
        value: `${obj[stateName].RECOV_CNT}`,
        inline: true
      }, {
        name: 'New Vaccine Doses (Last 24h)',
        value: `${newVaccine}`,
        inline: true
      }, {
        name: 'Total Vaccine Doses',
        value: `${obj[stateName].VACC_DOSE_CNT}`,
        inline: true
      }])
      .setTimestamp(obj[stateName].LAST_UPDATED_DATE)
      .setFooter('Data from Covid Live (https://covidlive.com.au)')
    interaction.reply({ embeds: [stateResponse] })
  }
}
