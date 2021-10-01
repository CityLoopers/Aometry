const { Schema, model } = require('mongoose');

module.exports = model("GuildConfig", new Schema({
    guildId: String,
    guildName: String,
    welcomeData: Array,
    welcomeChannel: String,
    welcomeMessage: String,
    leaveChannel: String,
    leaveMessage: String,
    logsChannel: String,
    rulesChannel: String,
    suggestionChannel: String,
    supportChannel: String,
    adminRoleId: String,
    modRoleId: String,

}))