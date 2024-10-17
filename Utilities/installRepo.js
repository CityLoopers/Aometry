const inquirer = require('inquirer').default

async function installRepo () {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'repoUrl',
      message: 'Enter the repository URL:',
      validate: (url) => (url.length > 0 ? true : 'Please enter a valid URL.')
    },
    {
      type: 'input',
      name: 'repoName',
      message: 'Enter a unique name for the repository:',
      validate: (name) => (name.length > 0 ? true : 'Please enter a name.')
    }
  ])
  process.stdin.resume()
}

module.exports = {
  installRepo
}
