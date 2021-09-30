const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Warning = require('../../schemas/warnings');

module.exports = {
        name: 'warn',
        description: 'Warnings System',
        permission: 'ADMINISTRATOR',
        options: [{
                name: 'add',
                description: 'Adds a warning to a member',
                type: 'SUB_COMMAND',
                options: [{
                        name: 'user',
                        description: 'Choose a user',
                        type: 'USER',
                        required: true,
                    },
                    {
                        name: 'reason',
                        description: 'Provide a reason',
                        type: 'STRING',
                        required: true,
                    },
                    {
                        name: 'evidence',
                        description: 'Provide evidence',
                        type: 'STRING',
                        required: false,
                    },
                ],
            },
            {
                name: 'check',
                description: 'Checks the users warnings',
                type: 'SUB_COMMAND',
                options: [{
                    name: 'user',
                    description: 'Choose a user',
                    type: 'USER',
                    required: true,
                }, ],
            },
            {
                name: 'remove',
                description: 'Removes the specified warning',
                type: 'SUB_COMMAND',
                options: [{
                        name: 'user',
                        description: 'Choose a user',
                        type: 'USER',
                        required: true,
                    },
                    {
                        name: 'id',
                        description: 'Choose a warning to remove',
                        type: 'NUMBER',
                        required: true,
                    },
                ],
            },
            {
                name: 'clear',
                description: 'Clears all warnings from user',
                type: 'SUB_COMMAND',
                options: [{
                    name: 'user',
                    description: 'Choose a user',
                    type: 'USER',
                    required: true,
                }, ],
            },
        ],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction  
         */
        execute(interaction, client) {
            const Sub = interaction.options.getSubcommand([
                'add',
                'check',
                'remove',
                'clear',
            ]);
            const Target = interaction.options.getMember('user');
            const Reason = interaction.options.getString('reason');
            const Evidence =
                interaction.options.getString('evidence') || 'None Provided';
            const warnID = interaction.options.getNumber('id') - 1;
            const warnDate = new Date(
                interaction.createdTimestamp
            ).toLocaleDateString();

            if (Sub === 'add') {
                Warning.findOne({
                        guildID: interaction.guildId,
                        userId: Target.id,
                        UserTag: Target.user.tag,
                    },
                    async(err, data) => {
                        if (err) console.log(err);
                        if (!data) {
                            data = new Warning({
                                guildID: interaction.guildId,
                                userId: Target.id,
                                UserTag: Target.user.tag,
                                Content: [{
                                    ExecuterID: interaction.user.id,
                                    ExecuterTag: interaction.user.tag,
                                    Reason: Reason,
                                    Evidence: Evidence,
                                    Date: warnDate,
                                }, ],
                            });
                        } else {
                            const obj = {
                                ExecuterID: interaction.user.id,
                                ExecuterTag: interaction.user.tag,
                                Reason: Reason,
                                Evidence: Evidence,
                                Date: warnDate,
                            };
                            data.Content.push(obj);
                        }
                        data.save();
                    }
                );
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle('WARNINGS')
                        .setColor('BLURPLE')
                        .setDescription(
                            `Warning Added: ${Target.user.tag} | ||${Target.id}||\n**Reason**:${Reason}\n**Evidence**: ${Evidence}`
                        ),
                    ],
                });
            } else if (Sub === 'check') {
                Warning.findOne({
                            guildID: interaction.guildId,
                            userId: Target.id,
                            UserTag: Target.user.tag,
                        },
                        async(err, data) => {
                            if (err) console.log(err);
                            if (data) {
                                interaction.reply({
                                            embeds: [
                                                    new MessageEmbed()
                                                    .setTitle('WARNINGS')
                                                    .setColor('BLURPLE')
                                                    .setDescription(
                                                        `${data.Content.map ((w, i) => `**ID**: ${i + 1}\n**By**: ${w.ExecutorTag}\n **Date**: ${w.Date}\n**Reason**: ${w.Reason}
                        \n`)
                      .join (' ')}`
                  ),
              ],
            });
          } else {
            interaction.reply ({
              embeds: [
                new MessageEmbed ()
                  .setTitle ('WARNINGS')
                  .setColor ('BLURPLE')
                  .setDescription (`${Target.user.tag} has no warnings!`),
              ],
            });
          }
        }
      );
    } else if (Sub === 'remove') {
      Warning.findOne (
        {
          guildID: interaction.guildId,
          userId: Target.id,
          UserTag: Target.user.tag,
        },
        async (err, data) => {
          if (err) console.log(err);
          if (data) {
            data.Content.splice (warnID, 1);
            interaction.reply ({
              embeds: [
                new MessageEmbed ()
                  .setTitle ('WARNINGS')
                  .setColor ('BLURPLE')
                  .setDescription (
                    `${Target.user.tag}'s warning id: ${warnID + 1} has been removed!`
                  ),
              ],
            });
            data.save ();
          } else {
            interaction.reply ({
              embeds: [
                new MessageEmbed ()
                  .setTitle ('WARNINGS')
                  .setColor ('BLURPLE')
                  .setDescription (`${Target.user.tag} has no warnings!`),
              ],
            });
          }
        }
      );
    } else if (Sub === 'clear') {
      Warning.findOne (
        {
          guildID: interaction.guildID,
          userId: Target.id,
          UserTag: Target.user.tag,
        },
        async (err, data) => {
          if (err) console.log(err);
          if (data) {
            await Warning.findOneAndDelete ({
              guildID: interaction.guildID,
              userId: Target.id,
              UserTag: Target.user.tag,
            });
            interaction.reply ({
              embeds: [
                new MessageEmbed ()
                  .setTitle ('WARNINGS')
                  .setColor ('BLURPLE')
                  .setDescription (
                    `${Target.user.tag}'s warnings have been cleared! | ||${Target.id}||`
                  ),
              ],
            });
          }
        }
      );
    }
  },
};