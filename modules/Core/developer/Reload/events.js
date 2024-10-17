const { ChatInputCommandInteraction, Client } = require("discord.js");
const { loadEvents } = require("../../../../handler/eventHandler");
module.exports = {
  subCommand: "reload.events",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    for (const [key, value] of client.events) {
      client.removeListener(`${key}`, value, true);
      loadEvents(client);

      interaction.reply({ content: "Events reloaded!", ephemeral: true });
    }
  },
};
