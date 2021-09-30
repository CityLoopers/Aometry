const { Client } = require("discord.js");
const mongoose = require('mongoose');
const { DBURL } = require('../../config.json');
const winston = require('winston');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'log' }),
            ],
            format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
        });
        
        client.on('ready', () => logger.log('info', 'The bot is online!'));
        client.on('debug', m => logger.log('debug', m));
        client.on('warn', m => logger.log('warn', m));
        client.on('error', m => logger.log('error', m));
        
        process.on('uncaughtException', error => logger.log('error', error));
        
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