const { ChatInputCommandInteraction, Client } = require("discord.js");
const { loadCommands } = require("../../../../handler/commandHandler");

module.exports = {
  subCommand: "reload.commands",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    for (const [key, value] of client.commands) {
      loadCommands(client);
      interaction.reply({ content: "Commands reloaded!", ephemeral: true });
    }
  },
};
