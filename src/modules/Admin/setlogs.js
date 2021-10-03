const { CommandInteraction, MessageEmbed } = require('discord.js');
const guildConfig = require('../../schemas/guildConfig');

module.exports = {
    name: 'set-logs',
    description: 'Set your logs Channel',
    permission: 'ADMINISTRATOR',
    options: [{
        name: 'channel',
        description: 'Set a channel',
        type: 'CHANNEL',
        required: true,
    }],

    /**
     * @param {CommandInteraction} interaction
     * @param {Guild} guild
     */
    async execute(interaction, guild) {
        const logChannel = interaction.options.getChannel('channel');

        guildConfig.findOne({
                guildId: interaction.guildId,
            },
            async(err, data) => {
                if (err) console.log(err);
                if (!data) {
                    data = new guildConfig({
                        guildId: interaction.guildId,
                        logsChannel: logChannel.id,
                    }, );
                    await data.save();
                    interaction.reply({
                        embeds: [
                            new MessageEmbed().setDescription(
                                `Channel set to: ${logChannel}`
                            ),
                        ],
                    });

                }

                if (data) {

                    data.logsChannel = logChannel,


                        await data.save();
                    interaction.reply({
                        embeds: [
                            new MessageEmbed().setDescription(
                                `Channel changed to: ${logChannel}`
                            ),
                        ],
                    });
                }

            }
        );
    },
};