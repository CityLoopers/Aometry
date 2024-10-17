const { Schema, model } = require('mongoose')

module.exports = model('MykiDB', new Schema({
  userId: String,
  userName: String,
  mykiNumber: String
}))
