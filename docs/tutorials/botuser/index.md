# Getting a Discord Bot User

To use Aometry you will need a bot account and all privileged intents to be enabled.

## Creating the bot application

In order to use Red, we must first create a Discord Bot account.

Creating a Bot account is a pretty straightforward process.

* Make sure you’re logged on to the Discord website.
* Navigate to the application page
* Click on the `New Application` button.
* Give the application a name and click `Create`.
* Create a Bot User by navigating to the `Bot` tab and clicking `Add Bot`
  * Click `Yes, do it!` to continue.
* If you want others to be able to invite your bot, tick the `Public Bot` checkbox. Keeping it unticked will prevent others from inviting your bot to their servers and only you will be able to add the bot.
  *  Make sure `Require OAuth2 Code Grant` is unchecked.
* Copy the token using the "Copy" button.
  * Paste this into `config.json`_

!> WARNING: Do not share your token with anyone. It is your password to the bot account

## Enabling Privileged Intents

!> INFORMATION: Aometry requires the usage of privileged intents,  This section is required.

* Make sure you're logged on to the Discord website.
* Navigate to the application Page
* Click on the bot you want to enable privileged intents for.
* Navigate to the bot tab on the left side of the screen.
* Scroll down to `Privileged Gateway Intents` section, enable both privileged intents and save your changes.

?> INFORMATION: Aometry bots with over 100 servers require bot verification which is not covered in this guide.
