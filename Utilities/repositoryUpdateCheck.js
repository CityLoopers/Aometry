const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer').default

async function checkForRepoUpdates (repo) {
  console.log(`Checking for updates for repository: ${repo.name}`)

  if (!fs.existsSync(path.join(__dirname, `../repositories/${repo.name}`))) {
    console.log(`Skipping ${repo.name} because it doesn't exist, you may need to install it again`)
    return
  }

  if (!fs.existsSync(path.join(__dirname, `../repositories/${repo.name}/info.json`))) {
    console.log(`Skipping ${repo.name} because it doesn't have an info.json, you may need to install it again`)
    return
  }
  const infoPath = path.join(
    __dirname,
          `../repositories/${repo.name}/info.json`
  )
  fs.readFile(infoPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading info.json for ${repo.name}:`, err)
      return
    }

    try {
      const info = JSON.parse(data)
      if (repo.version < info.version) {
        inquirer.prompt([
          {
            type: 'confirm',
            name: 'update',
            message: `Update repository ${repo.name} from ${repo.version} to ${info.version}?`,
            default: false
          }
        ])
        process.stdin.resume()
      }
      console.log(`Version for ${repo.name}: ${info.version}`)
    } catch (parseErr) {
      console.error(
              `Error parsing info.json for ${repo.name}:`,
              parseErr
      )
    }
  })
}

module.exports = {
  checkForRepoUpdates
}
