const { CommandInteraction, MessageEmbed, Guild, GuildMember } = require('discord.js');
/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 * @param {Guild} guild
 */
module.exports = {
    name: 'suggest',
    description: 'Suggest a feature',
    options: [{
            name: 'title',
            description: 'Set a title for the suggestion',
            type: 'STRING',
            required: true,
        },
        {
            name: 'description',
            description: 'Set a description for the suggestion',
            type: 'STRING',
            required: true,
        }
    ],
    async execute(interaction, client, guild) {
        const { options, user } = interaction;
        const title = options.getString('title');
        const description = options.getString('description');
        const suggestionChannel = guild.channels.cache.find((channel) => channel.name.toLowerCase() === `suggestions`)
        const identifier = Math.random()
            .toString(36)
            .substring(2, 7)

        const response = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('New Suggestion')
            .setDescription(`New suggestion by: ${user}`)
            .setFields([{
                    "name": "Title",
                    "value": `${title}`,
                    "inline": true
                },
                {
                    "name": "Description",
                    "value": `${description}`,
                    "inline": true
                },
            ])
            .setFooter(`Suggestion ID: ${identifier}`)

        suggestionChannel.send({ embeds: [response] });
        interaction.reply({ embeds: [new MessageEmbed().setColor('GREEN').setTitle('Suggestion Logged!').setDescription(`Thank your for your suggestion, ${user}! \nSuggestion ID: ${identifier}`)] });
    }
}