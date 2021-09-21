const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  ButtonInteraction,
  ThreadChannel
} = require('discord.js')

module.exports = {
  name: 'ticket',
  description: 'Opens a ticket',
  options: [
    {
      name: 'reason',
      description: 'Provide a reason for your ticket',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'General Inquiry',
          value: 'General Inquiry'
        },
        {
          name: 'Bug Report',
          value: 'Bug Report'
        },
        {
          name: 'Feature Request',
          value: 'Feature Request'
        }
      ]
    }
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {Guild} guild
   * @param {Message} message
   */
  async execute (client, interaction, message) {
    const result = Math.random()
      .toString(36)
      .substring(2, 7)
    const ticketUser = interaction.user.id;
    const logsChannelId = '889175556254498886'
    const logsChannel = interaction.guild.channels.cache.get(logsChannelId)
    const supportChannelId = '887549849002733598'
    const supportChannel = interaction.guild.channels.cache.get(
      supportChannelId
    )
    const ticketChannel = await supportChannel.threads.create({
      name: `${interaction.user.tag}-${result}`,
      autoArchiveDuration: 60,
      reason: `User created a ticket`
    })
    const ticketReason = interaction.options.getString('reason')

    const newTicket = new MessageEmbed()
      .setColor('YELLOW')
      .setAuthor(
        'New Ticket Created',
        `${interaction.user.displayAvatarURL({ dynamic: true })}`
      )
      .setDescription(`Ticket Created by ${interaction.user}`)
      .addField('Reason', `${ticketReason}`)
      .addField('Ticket Channel', `${ticketChannel}`)
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
    logsChannel.send({ embeds: [newTicket] })
    interaction
      .followUp(`A ticket has been created! Check it out ${ticketChannel}`)
      .then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000)
      })
    const ticketManage = new MessageEmbed()
      .setColor('YELLOW')
      .setAuthor('Thanks for creating a ticket!')
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
      .setDescription(`Ticket Created by ${interaction.user}`)
      .addField('Reason', `${ticketReason}`)
      .addField('Close this ticket', `Close this ticket by clicking the 🔒`)

    const CloseTicket = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('closeticket')
        .setLabel(`🔒 Close Ticket`)
        .setStyle('SUCCESS')
    )
    ticketChannel.send({ embeds: [ticketManage], components: [CloseTicket] }).then(sentMessage => {
      sentMessage.react(`🔒`)
    });
      //const filter = (interaction) => interaction.customId === 'button' && interaction.user.id === ticketUser;
    //const collector = message.channel.createMessageComponentCollector({
   //   filter,
  //    max: 1,
  //  });

 //   collector.on("end", async (ButtonInteraction) => {
  //    const id = (ButtonInteraction.first().customId);
//
  //    if(id === 'closeticket') {
   //     ticketChannel.set({content: 'Are you sure you want to close this ticket?', components:[new MessageActionRow().addComponents(new MessageButton().setCustomId('yes').setLabel('Yes').setStyle('SUCCESS'))]})
   //   }
  //  })
  }
}
