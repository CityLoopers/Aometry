const inquirer = require('inquirer').default
async function installModule () {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'repoName',
      message: 'Enter the name of the repository:',
      validate: (name) => (name.length > 0 ? true : 'Please enter a name.')
    },
    {
      type: 'input',
      name: 'moduleName',
      message: 'Enter the name of the module:',
      validate: (name) => (name.length > 0 ? true : 'Please enter a name.')
    }
  ])

  // Use answers.repoName and answers.moduleName to install the module
  // ... (locate, move, store in installedModules.json) ...
  process.stdin.resume()
}

module.exports = {
  installModule
}
