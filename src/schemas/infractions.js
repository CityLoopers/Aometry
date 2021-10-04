const { Schema, model } = require('mongoose')

module.exports = model('Infractions', new Schema({
  _id: Number,
  guildId: String,
  guildName: String,
  infUserId: String,
  infUserName: String,
  infUserTag: String,
  modUserId: String,
  modUserName: String,
  modUserTag: String

}))
