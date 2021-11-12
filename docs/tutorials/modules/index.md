# Aometry Module Development

This guide serves as a tutorial on creating cogs for Aometry v21.12. It will cover the basics of setting up a package for your module and the basics of setting up the file structure. We will also point you towards some further resources that may assist you in the process.

## Getting Started

To start off, be sure that you have installed Node.JS v16 or higher and also have NPM.
Next you need to decide if you want to develop against the Stable or Canary version of Aometry. Depending on what your goal is should help determine which version you need.

```md
NOTE
The Canary version may have changes on it which breaks compatibility with the Stable version and other modules. If your goal is to support both version, make sure you build compatibility layers or use separate branches to keep compatibility until the next major release
```

Next download the bot from the GitHub repository and open it in your favourite code editor.

### Creating a Module

With the bot open in your code editor, all we need to do to create a module is create a new folder! This can be named whatever you want the module to be named.

For the purposes of this example, we'll call it `Hello`

Next, decide if you want to create a prefix or a slash command.

### File structure

```
- src\
-- Structures
-- events
-- modules
---- Hello
------ slashCommands
-------- helloworld.js
------ prefixCommands
-------- helloworld.js
```

## Hello World

Let's create a very simple Hello World command so that you can get used to the structures for Aometry

### Prefix Command

- Create a folder inside the `Hello` folder and name it `prefixCommands`
- Create a file, and name it as `helloworld.js` and copy-and-paste the following content.

```js
module.exports = {
  name: 'helloworld',
  description: 'Hello World!',

  execute (message, args, commandName, client) {
    message.reply({content: 'Hello World!'})
  }
}
```

Congratulations, you've made your first Aometry Prefix Command!

### Slash Command

- Create a folder inside the `Hello` folder and name it `slashCommands`
- Create a file, and name it as `helloworld.js` and copy-and-paste the following content.

```js
const { CommandInteraction } = require('discord.js')

module.exports = {
  name: 'helloworld',
  description: 'Hello World!',
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  execute (interaction, client) {
    interaction.reply({content: 'Hello World!'})
  }
}
```

Congratulations, you've made your first Aometry Slash Command!

### Testing your Module

To test your module, you will need a running instance of Aometry.
Once the bot has started up do `[p]helloworld` The bot should respond with `Hello World!`. If it did, you have successfully created a module!

```md
INFO
[p] is your bot prefix
```