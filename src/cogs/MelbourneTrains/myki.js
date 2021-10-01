const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const mykiCard = require('../../schemas/myki')
const cardTypes = require('../../config/myki.json');

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
    const Sub = interaction.options.getSubcommand(['register', 'balance']);

    if (Sub === 'register') {
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
    } else if (Sub === 'balance') {
      mykiCard.findOne({
        userId: mykiUser,
      }, async(err, data) => {
        if (err) console.log(err);
        if (data) {
          // const mykiCardNumber = w.mykiUser;
          const mykiBalanceEmbed = new MessageEmbed()
          .setColor('#C2D840')
          .setTitle(`${interaction.user.username}'s Myki Balance`)
          .setDescription('Information Coming Soon!')
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .addFields([{
            "name": "Balance",
            "value": 'mykiBalance',
            "inline": true
          }, {
            "name": "Expiry",
            "value": 'mykiExpiry',
            "inline": true
          }, {
            "name": "Card Type",
            "value": 'mykiType',
            "inline": true
          }, {
            "name": "Topup Pending",
            "value": 'topupPending',
            "inline": true
          }]).setTimestamp()

          interaction.reply({ embeds: [mykiBalanceEmbed] })
        } else {
          interaction.reply({ embeds: [new MessageEmbed().setTitle('ERROR').setDescription('You Must Register your Myki First!')] })
        }
      });
    }
  }
}
