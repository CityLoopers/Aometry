module.exports = {
  name: 'ready',
  execute (client) {
    console.log('Aometry v21.09.01 is ready to go!')
    client.user.setActivity('to /help', { type: 'LISTENING' })
  }
}
