module.exports = {
    name: "guildMemberRemove",
    execute(member) {
        console.log(`${member.user.tag} left the server.`)
    }
}