const { CommandInteraction, MessageEmbed } = require('discord.js');
const guildConfig = require('../../schemas/guildConfig');

module.exports = {
    name: 'set-welcome',
    description: 'Set your Welcome Channel',
    permission: 'ADMINISTRATOR',
    options: [{
            name: 'channel',
            description: 'Set a channel',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'message',
            description: 'Set your welcome message',
            type: 'STRING',
            required: true,
        },
    ],

    /**
     * @param {CommandInteraction} interaction
     * @param {Guild} guild
     */
    async execute(interaction, guild) {
        const welcMessage = interaction.options.getString('message');
        const welcChannel = interaction.options.getChannel('channel');

        guildConfig.findOne({
                guildId: interaction.guildId,
            },
            async(err, data) => {
                if (err) console.log(err);
                if (!data) {
                    data = new guildConfig({
                        guildId: interaction.guildId,
                        guildName: interaction.guildName,
                        welcomeData: {
                            welcomeChannel: welcChannel.id,
                            welcomeMessage: welcMessage,
                        },
                    });

                    interaction.reply({
                        embeds: [
                            new MessageEmbed().setDescription(
                                `Channel set to: ${welcChannel}\n\n Message set to: ${welcMessage}`
                            ),
                        ],
                    });
                }

                if (data) {
                    await guildConfig.replaceOne({
                        welcomeData: {
                            welcomeChannel: welcChannel.id,
                            welcomeMessage: welcMessage,
                        },
                    });
                    interaction.reply({
                        embeds: [
                            new MessageEmbed().setDescription(
                                `Channel changed to: ${welcChannel}\n\n Message changed to: ${welcMessage}`
                            ),
                        ],
                    });
                }
                data.save();
            }
        );
    },
};