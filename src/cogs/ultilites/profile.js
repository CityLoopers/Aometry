const { Client, CommandInteraction, MessageAttachment } = require('discord.js')
const Canvas = require('canvas');

module.exports = {
    name: "profile",
    description: "Displays the mentioned user's profile",
    //options: [{
        //name: "user",
        //description: "Select a user.",
        //type: "USER",
        //required: true
    //}, ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(client, interaction){
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./wallpaper.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        interaction.followUp({ files: [attachment]});
    }   
}