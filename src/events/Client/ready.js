const { Client } = require("discord.js");
const mongoose = require('mongoose');
const { DBURL } = require('../../config.json');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(`✅ Aometry v21.10.0 Ready!`);
        client.user.setActivity("to /help", { type: 'LISTENING' });

        if (!DBURL) return;
        mongoose.connect(DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }).then(() => {
            console.log(`✅ Connected to database!`)
        }).catch((err) => {
            console.log(err)
        })
    }
}