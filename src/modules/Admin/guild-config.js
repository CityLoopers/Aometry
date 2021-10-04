const { MessageEmbed, CommandInteraction } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'guild-config',
    description: 'Tests pushing values to the database',
    options: [{
        name: 'server-id',
        description: 'The server id is pushed to the database (run this first)',
        permissions: 'ADMINISTRATOR',
        type: 'SUB_COMMAND'
    }, {
        name: 'welcome',
        description: 'Set the welcome channel in the database',
        type: 'SUB_COMMAND',
        options: [{
            name: 'welcome-channel',
            description: 'Choose a channel',
            type: 'CHANNEL',
            required: true,
        }, {
            name: 'welcome-message',
            description: 'Set a welcome message',
            type: 'STRING',
            required: false,
        }]
    }, {
        name: 'logs',
        description: 'Set the logs channel in the database',
        type: 'SUB_COMMAND',
        options: [{
            name: 'logs-channel',
            description: 'Choose a channel',
            type: 'CHANNEL',
            required: true,
        }]
    },{
        name: 'support',
        description: 'Set the support channel in the database',
        type: 'SUB_COMMAND',
        options: [{
            name: 'support-channel',
            description: 'Choose a channel',
            type: 'CHANNEL',
            required: true,
        }]
    },{
        name: 'suggest',
        description: 'Set the suggestion channel in the database',
        type: 'SUB_COMMAND',
        options: [{
            name: 'suggest-channel',
            description: 'Choose a channel',
            type: 'CHANNEL',
            required: true,
        }]
    },{
        name: 'roles',
        description: 'Set the admin and mod roles in the database',
        type: 'SUB_COMMAND',
        options: [{
            name: 'admin',
            description: 'Choose a channel',
            type: 'CHANNEL',
            required: false,
        },{
            name: 'mod',
            description: 'Choose a channel',
            type: 'CHANNEL',
            required: false,
        }]
    }],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand('server-id', 'welcome', 'logs');
        const guildConfig = new db.table(`guildConfig_${interaction.guildId}`)

        switch (sub) {
            case 'server-id':
                let aometryGuildId = interaction.guildId
                guildConfig.set('guildId', aometryGuildId)
                console.log(guildConfig.get('guildId'))
                let guildDescription = guildConfig.get('guildId')
                let guildEmbed = new MessageEmbed()
                    .setDescription(`Logs channel set to: <#${guildDescription}>`)
                interaction.reply({ embeds: [guildEmbed] })
                break;

            case 'welcome':
                let welcomeChannel = interaction.options.getChannel('welcome-channel')
                let welcomeMessage = interaction.options.getString('welcome-message') || "`Welcome ${member} to **${guild.name}**!\nLatest Member Count: **${guild.memberCount}**`"
                await guildConfig.set('welcomeChannel', welcomeChannel.id)
                await guildConfig.set('welcomeMessage', welcomeMessage)
                console.log(`--New Guild Config for ${interaction.guild} :: ${guildConfig.get('guildId')}--`)
                console.log(`WelcomeChannel ID: ${guildConfig.get('welcomeChannel')}`)
                console.log(`Welcome Message: ${guildConfig.get('welcomeMessage')}`)
                let welcomeDescription = guildConfig.get('welcomeChannel')
                let welcomeEmbed = new MessageEmbed()
                    .setDescription(`Welcome channel set to: <#${welcomeDescription}>`)
                interaction.reply({ embeds: [welcomeEmbed] })
                break;

            case 'logs':
                let logsChannel = interaction.options.getChannel('logs-channel')
                await guildConfig.set('logsChannel', logsChannel.id)
                console.log(`--New Guild Config for ${interaction.guild} :: ${guildConfig.get('guildId')}--`)
                console.log(`Logs Channel: ${guildConfig.get('logsChannel')}`)
                let logsDescription = guildConfig.get('logsChannel')
                let logsEmbed = new MessageEmbed()
                    .setDescription(`Logs channel set to: <#${logsDescription}>`)
                interaction.reply({ embeds: [logsEmbed] })
                break;
        }

    }
}