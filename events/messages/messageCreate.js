const { Message, Client } = require('discord.js')
const { classifyToxicity, TOXICITY_RESPONSES, classifyQuestion } = require('../../handler/llmHander.js')

module.exports = {
  name: 'messageCreate',
  /**
     * @param {Message} message
     * @param {Client} client
     */
  async execute (message, client) {
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content) return

    async function analyzeToxicity (message, client) {
      const toxicityPredictions = await classifyToxicity(message.content)
      const toxicityMatches = []
      toxicityPredictions.forEach((prediction) => {
        if (prediction.results[0].match === true) {
          toxicityMatches.push({ name: prediction.label, value: prediction.results[0].match, inline: true })
        }
      })

      if (toxicityMatches.length === 0) {
        return
      }

      const embed = {
        title: 'Sentiment Analysis',
        description: `${message.content}`,
        color: 5814783,
        fields: toxicityMatches,
        footer: {
          text: 'Powered by TensorFlow'
        },
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        }
      }
      const response = TOXICITY_RESPONSES[Math.floor(Math.random() * TOXICITY_RESPONSES.length)]
      await message.reply(`:fire: ${message.author.tag}, ${response}, Please be aware that continued violations of our community guidelines may result in further action.`)
      message.delete()
      const logsChannel = client.config.LOGS_CHANNEL
      client.channels.cache.get(logsChannel).send({ content: `<@&636406047560433665>: ${message.url}`, embeds: [embed] })
    }
    await analyzeToxicity(message, client)

    async function queryResponse (message, client) {
      const query = message.content

      // Get the similarity score using the classify function
      const predictions = await classifyQuestion(query)

      if (!predictions) {
        return
      }

      message.reply(predictions)
    }

    await queryResponse(message, client)
  }
}
