module.exports = {
    name: 'emitadd',
    permissions: 'ADMINISTRATOR',
    description: "Emits the guildMemberAdd Event",
    execute(message, args, commandName, client, Discord) {
        client.emit("guildMemberAdd", message.member);

    }
}