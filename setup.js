const inquirer = require('inquirer').default
const fs = require('fs')
const path = require('path')

async function setup () {
  const { token, dbURL, devId, logs, allowThirdParty } = await inquirer.prompt([
    {
      type: 'input',
      name: 'token',
      message: 'Your bot token (https://discord.com/developers/applications): ',
      validate: (id) => (id.length > 0 ? true : 'Please enter a Bot Token')
    },
    {
      type: 'input',
      name: 'dbURL',
      message: 'Database URL (https://www.mongodb.com/atlas/database): ',
      validate: (id) => (id.length > 0 ? true : 'Please enter a Database URL')
    },
    {
      type: 'input',
      name: 'devId',
      message:
        'Your Discord user ID (https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-): ',
      validate: (id) => (id.length > 0 ? true : 'Please enter a Developer ID')
    },
    {
      type: 'input',
      name: 'logs',
      message: 'The channel ID where you want the bot to send system logs: ',
      validate: (id) =>
        id.length > 0 ? true : 'Please enter a System Logs Channel'
    },
    {
      type: 'confirm',
      name: 'allowThirdParty',
      message:
        '\nDo you want to allow third party modules?\n\n' +
        'DISCLAIMER: Third party modules are not tested by the Aometry developers ' +
        'and may potentially be dangerous. The Aometry developers claim no ' +
        'responsibility for malicious code that gets installed through a 3rd ' +
        'party module.',
      default: false
    }
  ])

  // Store the values in the config file (.env)
  const envPath = path.resolve(__dirname, '.env')
  const envContent = `
BOT_TOKEN=${token}
DB_URL=${dbURL}
DEV_ID=${devId}
LOGS_CHANNEL=${logs}
ALLOW_THIRD_PARTY_MODULES=${allowThirdParty}
  `.trim()

  fs.writeFileSync(envPath, envContent, { encoding: 'utf8' })

  console.log('Configuration saved to .env file')

  const { modules } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'modules',
      message: '\nSelect the modules you want to enable: These modules are first party modules created by the Aometry developers. We recommend you enable them. You can disable modules at any time.',
      choices: [
        {
          name: 'Core',
          value: 'Core'
        },
        {
          name: 'Moderation',
          value: 'Moderation'
        },
        {
          name: 'Fun',
          value: 'Fun'
        },
        {
          name: 'Utility',
          value: 'Utility'
        },
        {
          name: 'Miscellaneous',
          value: 'Miscellaneous'
        }
      ]
    }
  ])

  if (!modules.length > 0) {
    require('./client.js')
    return
  }
  const installedRepositoriesPath = path.resolve(__dirname, './repositories/installedRepositories.json')
  // Create the file if it doesn't exist
  if (!fs.existsSync(installedRepositoriesPath)) {
    fs.writeFileSync(installedRepositoriesPath, JSON.stringify([], null, 2), { encoding: 'utf8' })
  }
  const installedRepositories = JSON.parse(fs.readFileSync(installedRepositoriesPath, 'utf8'))

  installedRepositories.push({
    name: 'Aometry',
    url: 'https://github.com/aometry/repo',
    type: 'git',
    last_update_check: '2024-10-18T00:00:00Z',
    version: '1.0.0',
    compatible_with_bot_version: '^24.10.0'
  })

  fs.writeFileSync(installedRepositoriesPath, JSON.stringify(installedRepositories, null, 2), { encoding: 'utf8' })

  // TODO: downloadRepositories(installedRepositories)

  const installedModulesPath = path.resolve(__dirname, './modules/installedModules.json')
  // Create the file if it doesn't exist
  if (!fs.existsSync(installedModulesPath)) {
    fs.writeFileSync(installedModulesPath, JSON.stringify([], null, 2), { encoding: 'utf8' })
  }
  const installedModules = JSON.parse(fs.readFileSync(installedModulesPath, 'utf8'))

  modules.forEach((module) => {
    installedModules.push({
      name: module,
      repository: 'Aometry',
      path: `/modules/${module}`,
      version: '1.0.0',
      compatible_with_bot_version: '^24.10.0'
    })
  })

  fs.writeFileSync(installedModulesPath, JSON.stringify(installedModules, null, 2), { encoding: 'utf8' })

  // TODO: downloadModules(installedModules)

  require('./client.js')
  process.stdin.resume()
}

setup().catch((error) => {
  console.error('Error during setup:', error)
})
