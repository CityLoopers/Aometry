module.exports = {
    name: 'emitremove',
    permissions: 'ADMINISTRATOR',
    description: "Emits the guildMemberRemove Event",
    execute(message, args, commandName, client, Discord) {
        client.emit("guildMemberRemove", message.member);
    }
}