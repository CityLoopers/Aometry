const fs = require('fs')

// Check if the .env file exists
if (!fs.existsSync('.env')) {
  // Run the interactive setup
  require('./setup.js')
} else {
  // Start the bot client
  require('./client.js')
}

require('./Utilities/cliManager.js')
