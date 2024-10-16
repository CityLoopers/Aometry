const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js')
const { classifyToxicity } = require('../../handler/llmHander.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('sentiment')
    .setDescription('Provides sentiment analysis of a message')
    .addStringOption((options) => options
      .setName('message')
      .setDescription('The message id to analyze')
      .setRequired(true)
    ),
  async execute (interaction) {
    const messageId = interaction.options.getString('message')
    const message = await interaction.channel.messages.fetch(messageId)
    interaction.deferReply()
    if (!message) {
      return await interaction.editReply('Message not found')
    }

    const text = message.content

    if (!text) {
      await interaction.editReply('No text found in message')
      return
    }

    const predictions = await classifyToxicity(text)
    const embed = {
      title: 'Sentiment Analysis',
      description: `${text}`,
      color: 5814783,
      fields: [],
      footer: {
        text: `Message ID: ${messageId} || Powered by TensorFlow`
      },
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }
    predictions.forEach((prediction) => {
      embed.fields.push({
        name: prediction.label,
        value: `${prediction.results[0].match}`,
        inline: true
      })
    })
    const response = { embeds: [embed] }

    await interaction.editReply(response)
  }
}
