const { BOT_TOKEN } = require('./config.js')

const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require('discord.js')
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember]
})

client.botVersion = require('./package.json').version
client.config = require('./config.js')
client.events = new Collection()
client.commands = new Collection()

const { loadEvents } = require('./handler/eventHandler')
loadEvents(client)

client
  .login(BOT_TOKEN)
  .then(() => {
    console.log('✅ Error Handler loaded')
  })
  .catch((err) => {
    console.log(err)
  })
