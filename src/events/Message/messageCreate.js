module.exports = {
    name: "messageCreate",
    execute(message, client) {
        if (message.content.toLowerCase() == "hello") {
            message.channel.send({ content: "Hi!" })
        };
    }
}