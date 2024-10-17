const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require('discord.js')
const { Guilds, GuildMembers, GuildMessages, MessageContent } =
  GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember]
})

client.botVersion = require('./package.json').version

// TODO: Check for updates to the bot based on the GitHub repository for the bot
require('./Utilities/botUpdateCheck.js').checkForBotUpdates(client)

client.config = require('./config.js')
client.events = new Collection()
client.commands = new Collection()
client.subCommands = new Collection()

// TODO: Add check for update of installed repositories and / or modules

require('./handler/llmHander.js')

const { loadEvents } = require('./handler/eventHandler')
loadEvents(client)

const { connect } = require('mongoose')
connect(client.config.DB_URL, {})
  .then(() => console.log('✅ Mongoose connected'))
  .catch((err) => console.log(err))

client
  .login(client.config.BOT_TOKEN)
  .then(() => {
    console.log('✅ Error Handler loaded')
  })
  .catch((err) => {
    console.log(err)
  })

process.on('unhandledRejection', (err) => {
  try {
    client.channels.cache
      .get(client.config.SYSTEM_LOGS_CHANNEL)
      .send({
        embeds: [
          {
            title: 'Unhandled Rejection',
            description: err.toString(),
            color: 0xff0000,
            timestamp: new Date()
          }
        ]
      })
  } catch (e) {
    console.log(e)
  }

  console.error(err)
})
