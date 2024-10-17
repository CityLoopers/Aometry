async function checkForBotUpdates (client) {
  // Download the latest version of the package.json file from the github repo
  // and compare the version numbers
  // If the new version is greater than the old version, then ask the user if they want to update
  // If the new version is less than the old version, then do nothing
  // If the new version is equal to the old version, then do nothing
  // If the user does not want to update, then do nothing
  // If the user does want to update, then update the bot

  // This function should be called in client.js

  const version = client.botVersion
  console.log(`Checking for updates for bot version: ${version}`)

  // TODO: Check for updates to the bot based on the GitHub repository for the bot
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log(`✅ Bot version ${version} is up to date!`)
}

module.exports = {
  checkForBotUpdates
}
