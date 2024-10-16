const fs = require('fs')
const path = require('path')

const mdFilePath = path.join(__dirname, '..', 'LLM', 'prompt.md')
let prompt = ''

fs.readFile(mdFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  prompt = data
})

// TODO: Send Prompt to Model

// TODO: Load Model

module.exports = {
  prompt
}
