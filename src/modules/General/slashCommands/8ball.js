const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const answers = [
  'Maybe.',
  'Certainly not.',
  'I hope so.',
  'Not in your wildest dreams.',
  'There is a good chance.',
  'Quite likely.',
  'I think so.',
  'I hope not.',
  'I hope so.',
  'Never!',
  'Fuhgeddaboudit.',
  'Ahaha! Really?!?',
  'Pfft.',
  'Sorry, bucko.',
  'Hell, yes.',
  'Hell to the no.',
  'The future is bleak.',
  'The future is uncertain.',
  'I would rather not say.',
  'Who cares?',
  'Possibly.',
  'Never, ever, ever.',
  'There is a small chance.',
  'Yes!'
]
module.exports = {
  name: '8ball',
  description: 'You ask and i awnser',
  options: [
    {
      type: 'STRING',
      description: 'Your question',
      name: 'question',
      required: true
    }
  ],
  module: 'General',
  /**
     * @param {Client} client
     * @param {Message} message
     */
  async execute (interaction) {
    const member = interaction.user

    const yq = interaction.options.getString('question')

    const embed = new MessageEmbed()
      .setAuthor(`${member.tag} Asked me`, member.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Question:** \n ${yq} \n**My Answer:** \n ${answers[Math.floor(Math.random() * answers.length)]}`)
      .setColor('YELLOW')
    interaction.reply({ embeds: [embed] })
  }
}
