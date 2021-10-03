const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const mykiCard = require('../../schemas/myki')
const { cardTypes } = require('../../config/myki.json');
const utils = require('../../utils')
const cheerio = require('cheerio')

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
        let mykiUser = interaction.user.id;
        const sub = interaction.options.getSubcommand(['register', 'balance']);

        if (sub === 'register') {
            let mykiRegisterNumber = interaction.options.getString('card-number');
            mykiCard.findOne({
                userId: mykiUser,
            }, async(err, data) => {
                if (err) console.log(err);
                if (!data) {
                    data = new mykiCard({
                        userId: mykiUser,
                        userName: interaction.user.username,
                        mykiNumber: mykiRegisterNumber,
                    });
                    const mykiRegister = new MessageEmbed()
                        .setColor('#C2D840')
                        .setTitle('Myki Registered!')
                        .setDescription(`Thank you for registering your myki! ${interaction.user}`)
                        .setTimestamp()

                    interaction.reply({ embeds: [mykiRegister] })
                } else {
                    const mykiAlrRegister = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Myki Already Registered!')
                        .setDescription(`Your Myki is Already Registered! ${interaction.user}`)
                        .setTimestamp()

                    interaction.reply({ embeds: [mykiAlrRegister] })
                }
                data.save();
            })
        } else if (sub === 'balance') {
            mykiCard.findOne({
                userId: mykiUser,
            }, async(err, data) => {
                if (err) console.log(err);
                if (data) {
                    let mykiCardNumber = data.mykiNumber;
                    let ptvKey = await utils.getData('myki', 'ptv-key', async() => {
                        let ptvData = await utils.request('https://ptv.vic.gov.au')
                        let $ = cheerio.load(ptvData)
                        let script = Array.from($('body script')).find(s => {
                            if (s.children[0]) {
                                let t = s.children[0].data
                                return t.includes('server_state') && t.includes('mykiToken') && t.includes('mapToken')
                            }
                        }).children[0].data

                        let data = JSON.parse(script.slice(script.indexOf('=') + 1))
                        let key = `${data.mykiTime}-${data.mykiToken}`

                        return key
                    }, 1000 * 60 * 60)
                    mykiCardNumber = '308425252756844'
                    let mykiData = await utils.getData('myki', mykiCardNumber, async() => {
                        try {
                            return JSON.parse(await utils.request(`https://mykiapi.ptv.vic.gov.au/v2/myki/card`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    0: {
                                        mykiCardNumber: mykiCardNumber
                                    }
                                }),
                                headers: {
                                    'authority': 'mykiapi.ptv.vic.gov.au',
                                    'accept': 'application/json',
                                    'content-type': 'application/json',
                                    'referer': 'https://www.ptv.vic.gov.au/tickets/myki/',
                                    'x-ptvwebauth': ptvKey
                                },
                                gzip: true
                            })).data[0]
                        } catch (e) {
                            return { error: 'INVALIDCARD' }
                        }
                    })

                    if (mykiData.error) {
                        return interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('Your Myki number is invalid!')] })
                    }

                    let balance = parseFloat(mykiData.mykiBalance)
                    let expiry = mykiData.mykiCardExpiryDate
                    let topupPending = parseFloat(mykiData.mykiBalanceIncludingPending) - balance
                    let cardType = cardTypes[mykiData.passengerCode]

                    let mykiBalanceEmbed = new MessageEmbed()
                        .setColor('#C2D840')
                        .setTitle(`${interaction.user.username}'s Myki Balance`)
                        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                        .addFields([{
                            "name": "Balance",
                            "value": `${balance < 0 ? '-$' : '$'}${Math.abs(balance).toFixed(2)}`,
                            "inline": true
                        }, {
                            "name": "Expiry",
                            "value": expiry,
                            "inline": true
                        }, {
                            "name": "Card Type",
                            "value": cardType,
                            "inline": true
                        }, {
                            "name": "Topup Pending",
                            "value": `$${topupPending.toFixed(2)}`,
                            "inline": true
                        }]).setTimestamp()

                    if (mykiData.Product && mykiData.Product.length) {
                        let pass = mykiData.Product[0]
                        console.log(pass)
                        let expiry = moment.tz(pass.lastUtilizationDate, 'Australia/Melbourne')
                        let now = moment.tz('Australia/Melbourne')

                        let difference = moment.duration(expiry.diff(now))

                        let years = Math.abs(difference.years())
                        let months = Math.abs(difference.months())
                        let days = Math.abs(difference.days())

                        let hours = Math.abs(difference.hours())
                        let minutes = Math.abs(difference.minutes())

                        let joining = []
                        if (years) joining.push(years + ' years')
                        if (months) joining.push(months + ' months')
                        if (days) joining.push(days + ' days')

                        if (!joining.length) {
                            joining.push(hours + 'hours')
                            joining.push(minutes + 'minutes')
                        }

                        mykiBalanceEmbed.addFields({ name: 'Myki Pass Zones', value: `${pass.zoneMin} - ${pass.zoneMax}`, inline: true }, { name: 'Myki Pass Expiry', value: joining.join(', '), inline: true })
                    }

                    interaction.reply({ embeds: [mykiBalanceEmbed] })
                } else {
                    interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('You Must Register your Myki First!')] })
                }
            });
        }
    }
}