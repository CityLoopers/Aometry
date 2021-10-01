const {
    Client,
    CommandInteraction,
    MessageEmbed,
    MessageAttachment
} = require('discord.js')
const utils = require('../../utils')
const { pidTypes } = require('../../config/pid')
const stations = require('../../config/stations')
const puppeteer = require('puppeteer')
const fs = require('fs')

const stationList = Object.keys(stations).map(code => ({
    name: stations[code],
    value: code
}))

module.exports = {
    name: 'pid',
    description: 'Displays the selected PID',
    options: [{
        name: 'pid-type',
        description: 'Select the PID type to display',
        type: 'STRING',
        required: true,
        choices: pidTypes.map(pid => ({ name: pid.name, value: pid.value }))
    }, {
        name: 'station',
        description: 'Choose a station',
        type: 'STRING',
        required: false
    }, {
        name: 'platform',
        description: 'Choose a platform',
        type: 'NUMBER',
        required: false
    }],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const pidType = interaction.options.getString('pid-type');
        const stationCode = interaction.options.getString('station');
        const platform = interaction.options.getNumber('platform') || '*';

        const stationName = stationCode ? stations[stationCode].toUpperCase() : '-'
        const pidData = pidTypes.find(pid => pid.value === pidType)

        if (pidData.url.includes('{0}') && !stationCode) {
            return interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('Selected PID Type requires station!')] })
        } else if (!stationName) {
            return interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('Invalid station code provided!')] })
        }

        let extraPIDOption

        if (pidType === 'sss-coach-new') {
            let ranges = [
                [56, 57, 58],
                [59, 60, 61, 62],
                [63, 64, 65, 66],
                [67, 68, 69, 70]
            ]
            let range = ranges.find(r => r.includes(platform))
            extraPIDOption = range ? range.length : 4
        } else if (pidType.startsWith('sss-')) {
            platform = platform + (platform % 2 - 1)
            platform = `${platform}-${platform + 1}`
        }

        const pidURL = pidData.url.format(stationName, platform, pidType, extraPIDOption)
        const fileName = `${stationCode}-${platform}-${pidType}`.toLowerCase().replace(/[^\w\d ]/g, '-').replace(/  */g, '-').replace(/--+/g, '-').replace(/-$/, '').replace(/^-/, '') + '.png'

        await interaction.reply('Working on it...')

        try {
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
            const page = await browser.newPage()

            await page.setViewport({
                width: pidData.size[0],
                height: pidData.size[1],
                deviceScaleFactor: 2
            })

            await page.goto(pidURL, { waitUntil: 'networkidle2' })
            await utils.sleep(4500)

            await page.screenshot({ path: fileName })
            await browser.close()

            const response = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${interaction.user.tag}\'s Requested PID`)
                .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true })}`)
                .setImage('attachment://' + fileName)
                .setFooter(`Requested By ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            await interaction.followUp({ embeds: [response], files: [new MessageAttachment(fileName)] })
            fs.unlink(fileName, () => {})
        } catch (e) {
            return interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('An error occurred while generating your PID!')] })
        }
    }
}