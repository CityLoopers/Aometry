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
client.config = require('./config.js')
client.events = new Collection()
client.commands = new Collection()
client.subCommands = new Collection()

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
  client.channels.cache
    .get(client.config.LOGS_CHANNEL)
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
  console.error(err)
})
