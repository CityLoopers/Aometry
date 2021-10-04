/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { MessageEmbed, CommandInteraction, Client } = require('discord.js')
const mykiCard = require('../../schemas/myki')
const { cardTypes } = require('../../config/myki.json')
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
      required: true
    }]
  }, {
    name: 'balance',
    description: 'Check your account balance',
    type: 'SUB_COMMAND'
  }, {
    name: 'delete',
    description: 'Delete your myki account from the database',
    type: 'SUB_COMMAND'
  }],
  async execute (interaction, client) {
    const mykiUser = interaction.user.id
    const sub = interaction.options.getSubcommand(['register', 'balance'])

    if (sub === 'register') {
      const mykiRegisterNumber = interaction.options.getString('card-number')
      mykiCard.findOne({
        userId: mykiUser
      }, async (err, data) => {
        if (err) console.log(err)
        if (!data) {
          // eslint-disable-next-line new-cap
          data = new mykiCard({
            userId: mykiUser,
            userName: interaction.user.username,
            mykiNumber: mykiRegisterNumber
          })
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
        data.save()
      })
    } else if (sub === 'balance') {
      mykiCard.findOne({
        userId: mykiUser
      }, async (err, data) => {
        if (err) console.log(err)
        if (data) {
          const mykiCardNumber = data.mykiNumber
          const ptvKey = await utils.getData('myki', 'ptv-key', async () => {
            const ptvData = await utils.request('https://ptv.vic.gov.au')
            const $ = cheerio.load(ptvData)
            // eslint-disable-next-line array-callback-return
            const script = Array.from($('body script')).find((s) => {
              if (s.children[0]) {
                const t = s.children[0].data
                return t.includes('server_state') && t.includes('mykiToken') && t.includes('mapToken')
              }
            }).children[0].data

            const data = JSON.parse(script.slice(script.indexOf('=') + 1))
            const key = `${data.mykiTime}-${data.mykiToken}`

            return key
          }, 1000 * 60 * 60)

          const mykiData = await utils.getData('myki', mykiCardNumber, async () => {
            try {
              return JSON.parse(await utils.request('https://mykiapi.ptv.vic.gov.au/v2/myki/card', {
                method: 'POST',
                body: JSON.stringify({
                  0: {
                    mykiCardNumber: mykiCardNumber
                  }
                }),
                headers: {
                  authority: 'mykiapi.ptv.vic.gov.au',
                  accept: 'application/json',
                  'content-type': 'application/json',
                  referer: 'https://www.ptv.vic.gov.au/tickets/myki/',
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

          const balance = parseFloat(mykiData.mykiBalance)
          const expiry = mykiData.mykiCardExpiryDate
          const topupPending = parseFloat(mykiData.mykiBalanceIncludingPending) - balance
          const cardType = cardTypes[mykiData.passengerCode]

          const mykiBalanceEmbed = new MessageEmbed()
            .setColor('#C2D840')
            .setTitle(`${interaction.user.username}'s Myki Balance`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields([{
              name: 'Balance',
              value: `${balance < 0 ? '-$' : '$'}${Math.abs(balance).toFixed(2)}`,
              inline: true
            }, {
              name: 'Expiry',
              value: expiry,
              inline: true
            }, {
              name: 'Card Type',
              value: cardType,
              inline: true
            }, {
              name: 'Topup Pending',
              value: `$${topupPending.toFixed(2)}`,
              inline: true
            }]).setTimestamp()

          if (mykiData.Product && mykiData.Product.length) {
            const pass = mykiData.Product[0]
            console.log(pass)
            const expiry = moment.tz(pass.lastUtilizationDate, 'Australia/Melbourne')
            const now = moment.tz('Australia/Melbourne')

            const difference = moment.duration(expiry.diff(now))

            const years = Math.abs(difference.years())
            const months = Math.abs(difference.months())
            const days = Math.abs(difference.days())

            const hours = Math.abs(difference.hours())
            const minutes = Math.abs(difference.minutes())

            const joining = []
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
      })
    } else if (sub === 'delete') {
      mykiCard.findOne({
        userId: mykiUser
      }, async (err, data) => {
        if (err) console.log(err)
        if (data) {
          await mykiCard.findOneAndDelete({
            userId: mykiUser
          })
          const mykiDelete = new MessageEmbed()
            .setColor('#C2D840')
            .setTitle('Myki Deleted!')
            .setDescription(`Your Myki account has been deleted from the database! ${interaction.user}`)
            .setTimestamp()

          interaction.reply({ embeds: [mykiDelete] })
        }
      })
    }
  }
}
