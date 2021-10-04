const { Schema, model } = require('mongoose');

module.exports = model("WarningDB", new Schema({
    guildID: String,
    userId: String,
    UserTag: String,
    Content: Array,
}))