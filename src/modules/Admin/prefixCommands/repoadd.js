/* eslint-disable node/handle-callback-err */
const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  // Command Information Goes Here
  name: 'repoadd',
  description: 'Adds a repo to Aometry',
  module: 'Admin',

  /**
* @param {CommandInteraction} interaction
* @param {Client} client
*/
  async execute (message, args, commandName, client) {
    const ghdownload = require('github-download')
    const exec = require('exec')
    const repo = args[0]

    ghdownload(repo, '../../../Structures/repos/')
      .on('dir', function (dir) {
        console.log(dir)
      })
      .on('file', function (file) {
        console.log(file)
      })
      .on('zip', function (zipUrl) { // only emitted if Github API limit is reached and the zip file is downloaded
        console.log(zipUrl)
      })
      .on('error', function (err) {
        console.error(err)
      })
      .on('end', function () {
        exec('tree', function (err, stdout, sderr) {
          console.log(stdout)
        })
      })

    message.reply({ content: `Added ${repo}` })
  }
}
