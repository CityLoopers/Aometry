module.exports = {
    name: "ready",
    execute(client) {
        console.log('Aometry v20.09.01 is ready to go!');
        client.user.setActivity('to a!help', { type: 'LISTENING' });
    }
};