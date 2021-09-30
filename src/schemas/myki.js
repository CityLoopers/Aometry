const { Schema, model } = require('mongoose');

module.exports = model("MykiDB", new Schema({
    userId: String,
    userTag: String,
    mykiNumber: String,
}))