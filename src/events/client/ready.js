const mongoose = require('mongoose')
const { dburl } = require('../../config.json')
module.exports = {
  name: 'ready',
  execute (client) {
    console.log('Aometry v21.09.01 is ready to go!')
    client.user.setActivity('to /help', { type: 'LISTENING' })

    if (!dburl) return
    mongoose
      .connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to the database!')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
