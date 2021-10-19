const { CommandInteraction, MessageEmbed, MessageAttachment } = require('discord.js')
const utils = require('../../utils')
const puppeteer = require('puppeteer')
const fs = require('fs')

module.exports = {
  name: 'exposure',
  description: 'Show covid exposure sites in various forms.',
  options: [{
    name: 'state',
    description: 'Display covid information about the specified state',
    type: 'STRING',
    required: true,
    choices: [
      { name: 'New Zealand', value: 'nz' },
      { name: 'Australian Capital Territory', value: 'act' },
      { name: 'New South Wales', value: 'nsw' },
      { name: 'Northern Territory', value: 'nt' },
      { name: 'Queensland', value: 'qld' },
      { name: 'South Australia', value: 'sa' },
      { name: 'Tasmania', value: 'tas' },
      { name: 'Victoria', value: 'vic' },
      { name: 'Western Australia', value: 'wa' }
    ]
  }],
  module: 'Covid',
  /**
  * @param {CommandInteraction} interaction
  * @param {Client} client
  */
  async execute (interaction, client) {
    const state = interaction.options.getString('state')
    const url = `https://covid19nearme.com.au/state/${state}`
    await interaction.deferReply()
    const fileName = `${state}-exposure-sites`.toLowerCase() + '.png'
    try {
      const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
      const page = await browser.newPage()

      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
      })
      await page.goto(url, { waitUntil: 'networkidle2' })
      await utils.sleep(4500)

      await page.screenshot({ path: fileName })
      await browser.close()

      const response = new MessageEmbed()
        .setColor('PURPLE')
        .setAuthor(`${state.toUpperCase()} Exposure Sites`)
        .setDescription(`Explore it interactively: https://covid19nearme.com.au/state/${state}`)
        .setImage('attachment://' + fileName)
        .setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

      await interaction.editReply({ embeds: [response], files: [new MessageAttachment(fileName)] })
      setTimeout(() => {
        fs.unlink(fileName, () => {})
      }, 5000)
    } catch (e) {
      return interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('An error occurred while generating your PID!')] })
    }
  }
}
