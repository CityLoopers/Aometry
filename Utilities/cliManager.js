const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.on('line', (line) => {
  const [command, ...args] = line.trim().split(' ')

  if (command === 'install') {
    if (args[0] === 'repo') {
      try {
        require('./installRepo.js').installRepo()
      } catch (error) {
        console.error('Error installing repo:', error)
      }
    } else if (args[0] === 'module') {
      try {
        require('./installModule.js').installModule()
      } catch (error) {
        console.error('Error installing module:', error)
      }
    }
  }
})

process.stdin.resume()
