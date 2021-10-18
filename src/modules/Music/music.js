/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { Client, CommandInteraction, MessageEmbed, DiscordAPIError } = require('discord.js')
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice')
const yts = require('yt-search')
const ytdl = require('ytdl-core')
const { stream } = require('npmlog')

const queueDB = new Map()

module.exports = {
  name: 'music',
  description: 'Joins the current voice channel, if the user is in one.',
  options: [{
    name: 'play',
    description: '▶️ Queue your song, just add a link! Also acts as resume.',
    type: 'SUB_COMMAND',
    options: [{
      name: 'from-youtube',
      description: '🔍 Search youtube for your song!',
      type: 'STRING',
      require: true
    }]
  },
  {
    name: 'pause',
    description: '⏸️ Pause the current music!',
    type: 'SUB_COMMAND'
  },
  {
    name: 'resume',
    description: '▶️ Resume the current music!',
    type: 'SUB_COMMAND'
  },
  {
    name: 'skip',
    description: '⏩ Skip the current song!',
    type: 'SUB_COMMAND'
  },
  {
    name: 'queue',
    description: '🎶 Peak what is in the future!',
    type: 'SUB_COMMAND'
  },
  {
    name: 'stop',
    description: 'pause the current music!',
    type: 'SUB_COMMAND'
  }
  ],
  module: 'Music',
  /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
  async execute (interaction, client) {
    const options = interaction.options.getSubcommand()
    const vc = interaction.member.voice.channel

    if (vc === null) {
      const Response = new MessageEmbed()
        .setColor('RED')
        .setDescription('❓ You are not in a VC!')
      return interaction.reply({
        embeds: [Response],
        ephemeral: false
      })
    }

    if (options === 'play') {
      // First lets obtain the data over the audio

      const youtubeSong = interaction.options.getString('from-youtube')

      if (youtubeSong != null) {
        interaction.reply({ content: 'Working on it...', ephemeral: false })

        let videoResult
        let videoURL
        // Verify the name of the song? : IsURL != IsyoutubeSong
        if (!ytdl.validateURL(youtubeSong)) {
          videoResult = await yts.search(youtubeSong)
          videoURL = ((videoResult.videos.length > 1) ? videoResult.videos[0].url : null)
        } else {
          videoURL = youtubeSong
        }

        if (videoURL === null) {
          interaction.editReply({
            content: `Could not find song with name ${youtubeSong}! This is a temporary message!`
          })
        }

        const info = await ytdl.getBasicInfo(videoURL)
        let time = '00:00'
        const timeInSecs = parseInt(info.videoDetails.lengthSeconds)
        if (info.videoDetails.lengthSeconds / 60 >= 10) {
          if (info.videoDetails.lengthSeconds % 60 >= 10) {
            time = `${parseInt(Math.floor(timeInSecs / 60))}:${timeInSecs % 60}`
          } else {
            time = `${parseInt(Math.floor(timeInSecs / 60))}:0${timeInSecs % 60}`
          }
        } else {
          if (info.videoDetails.lengthSeconds % 60 >= 10) {
            time = `0${parseInt(Math.floor(timeInSecs / 60))}:${timeInSecs % 60}`
          } else {
            time = `0${parseInt(Math.floor(timeInSecs / 60))}:0${timeInSecs % 60}`
          }
        }

        let descfix = info.videoDetails.description
        if (!descfix) {
          descfix = 'No description'
        }

        if (descfix.length > 398) {
          deskfix = descfix.substring(0, 398) + '...'
        }

        // Then here we will shape out the queue, ensuring if it exists for this guild, and creating the appropriate player else.

        if (!queueDB.has(vc.guild.id)) { // This is when there is no queue
          // Shape the song data
          const song = {
            songURL: videoURL,
            title: info.videoDetails.title,
            time: time,
            requestee: interaction.member,
            author: info.videoDetails.author.name,
            description: descfix,
            id: info.videoDetails.videoId
          }
          // This is the queue information
          const queueConstruct = {
            voiceChannel: vc,
            textChannel: interaction.channel,
            songs: [],
            player: null,
            connection: null,
            volume: 5,
            playing: true
          }
          queueConstruct.songs.push(song)
          queueDB.set(vc.guild.id, queueConstruct)

          // Generate the connection, then the player
          const connection = joinVoiceChannel({
            channelId: vc.id,
            guildId: vc.guild.id,
            adapterCreator: vc.guild.voiceAdapterCreator
          })

          queueDB.get(vc.guild.id).connection = connection

          const stream = ytdl(videoURL, { filter: 'audioonly' })
          const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary })
          player = createAudioPlayer()

          player.play(resource)
          connection.subscribe(player)

          queueDB.get(vc.guild.id).player = player

          player.on(AudioPlayerStatus.Idle, () => continuePlayer(vc))
          // The line below, just fixes everything, why? NO CLUE! But it does.
          player.on('error', error => {
            console.log('Error:', error.message)
          })

          // Then, output, cool I guess.
          const Response = new MessageEmbed()
            .setAuthor(`${interaction.member.user.username} requested`, `${interaction.member.user.displayAvatarURL({ dynamic: true })}?size=256`)
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
            .setColor('#2f3136')
            .addField(`Now Playing: ${song.title}`, '_____________', false)
            .addField('Author', `${song.author}`, false)
            .addField('Length', `${song.time}`)
            .addField('Description', `${song.description.substring(0, 1024)}`)

          interaction.editReply({
            embeds: [Response],
            content: ' '
          })
        } else { // This is when there is a queue already
          // Shape the song data
          const song = {
            songURL: videoURL,
            title: info.videoDetails.title,
            time: time,
            requestee: interaction.member,
            author: info.videoDetails.author.name,
            description: descfix.substring(0, 1000) + '...',
            id: info.videoDetails.videoId
          }
          queueDB.get(vc.guild.id).songs.push(song)

          // Then, output, cool I guess.
          const Response = new MessageEmbed()
            .setColor('BLURPLE')
            .setDescription(`🎶 **${song.title}** was added to the queue.`)
          interaction.editReply({
            embeds: [Response],
            content: ' '
          })
        }
      } else {
        if (queueDB.has(vc.guild.id)) {
          const unpause = queueDB.get(vc.guild.id).player.unpause()

          if (unpause === true) {
            const Response = new MessageEmbed()
              .setColor('BLURPLE')
              .setDescription('▶️ Resumed the music.')
            interaction.reply({
              embeds: [Response]
            })
          } else {
            const Response = new MessageEmbed()
              .setColor('RED')
              .setDescription('⛔ The audio cannot be unpaused.')
            interaction.reply({
              embeds: [Response],
              ephemeral: false
            })
          }
        } else {
          const Response = new MessageEmbed()
            .setColor('RED')
            .setDescription('❓ I am not in a VC!')
          interaction.reply({
            embeds: [Response],
            ephemeral: false
          })
        }
      }
    }

    if (options === 'stop') {
      if (queueDB.has(vc.guild.id)) {
        queueDB.get(vc.guild.id).player.stop()
        queueDB.get(vc.guild.id).connection.destroy()
        queueDB.delete(vc.guild.id)

        const Response = new MessageEmbed()
          .setColor('BLURPLE')
          .setDescription('⏹️ Stopped the music.')
        interaction.reply({
          embeds: [Response],
          content: ' '
        })
      } else {
        const Response = new MessageEmbed()
          .setColor('RED')
          .setDescription('❓ I am not in a VC!')
        interaction.reply({
          embeds: [Response],
          ephemeral: false
        })
      }
    }

    if (options === 'skip') {
      if (queueDB.has(vc.guild.id)) {
        const recalledSong = queueDB.get(vc.guild.id).songs[0].title
        continuePlayer(vc)
        const Response = new MessageEmbed()
          .setColor('BLURPLE')
          .setDescription(`⏩ Skipped **${recalledSong}**.`)
        interaction.reply({
          embeds: [Response]
        })
      } else {
        const Response = new MessageEmbed()
          .setColor('RED')
          .setDescription('❓ I am not in a VC!')
        interaction.reply({
          embeds: [Response],
          ephemeral: false
        })
      }
    }

    if (options === 'pause') {
      if (queueDB.has(vc.guild.id)) {
        const pause = queueDB.get(vc.guild.id).player.pause(true)
        if (pause === true) {
          const Response = new MessageEmbed()
            .setColor('BLURPLE')
            .setDescription('⏸️ Paused the music.')
          interaction.reply({
            embeds: [Response]
          })
        } else {
          const Response = new MessageEmbed()
            .setColor('RED')
            .setDescription('⛔ The audio cannot be paused.')
          interaction.reply({
            embeds: [Response],
            ephemeral: false
          })
        }
      } else {
        const Response = new MessageEmbed()
          .setColor('RED')
          .setDescription('❓ I am not in a VC!')
        interaction.reply({
          embeds: [Response],
          ephemeral: false
        })
      }
    }

    if (options === 'resume') {
      if (queueDB.has(vc.guild.id)) {
        const unpause = queueDB.get(vc.guild.id).player.unpause()

        if (unpause === true) {
          const Response = new MessageEmbed()
            .setColor('BLURPLE')
            .setDescription('▶️ Resumed the music.')
          interaction.reply({
            embeds: [Response]
          })
        } else {
          const Response = new MessageEmbed()
            .setColor('RED')
            .setDescription('⛔ The audio cannot be unpaused.')
          interaction.reply({
            embeds: [Response],
            ephemeral: false
          })
        }
      } else {
        const Response = new MessageEmbed()
          .setColor('RED')
          .setDescription('❓ I am not in a VC!')
        interaction.reply({
          embeds: [Response],
          ephemeral: false
        })
      }
    }

    if (options === 'queue') {
      if (queueDB.has(vc.guild.id)) {
        const songy = queueDB.get(vc.guild.id).songs
        const Response = new MessageEmbed()
          .setAuthor(`${songy[0].requestee.user.username} requested`, `${songy[0].requestee.user.displayAvatarURL({ dynamic: true })}?size=256`)
          .setThumbnail(`https://img.youtube.com/vi/${songy[0].id}/mqdefault.jpg`)
          .setColor('BLURPLE')
          .addField(`Now Playing: ${songy[0].title}`, '_____________', false)
          .addField('NEXT UP:', '_____________', false)
        let i = 0
        if (songy[1]) {
          songy.forEach(song => {
            if (i !== 0) { Response.addField(`${i}: **${song.title}**`, `Length: ${song.time}, Reqested By: ${song.requestee.user.username}`, false) }
            i++
          })
        }
        interaction.reply({
          embeds: [Response],
          content: ' '
        })
      } else {
        const Response = new MessageEmbed()
          .setColor('RED')
          .setDescription('❓ I am not in a VC!')
        interaction.reply({
          embeds: [Response],
          ephemeral: false
        })
      }
    }
  }
}

async function continuePlayer (vc) {
  const oldtext = queueDB.get(vc.guild.id).textChannel
  queueDB.get(vc.guild.id).songs.shift()
  const player = queueDB.get(vc.guild.id).player
  if (queueDB.get(vc.guild.id).songs[0]) {
    const song = queueDB.get(vc.guild.id).songs[0]
    const stream = ytdl(song.songURL, { filter: 'audioonly' })
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary })
    player.play(resource)

    const Response = new MessageEmbed()
      .setAuthor(`${song.requestee.user.username} requested`, `${song.requestee.user.displayAvatarURL({ dynamic: true })}?size=256`)
      .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
      .setColor('#2f3136')
      .addField(`Now Playing: ${song.title}`, '_____________', false)
      .addField('Author', `${song.author}`, false)
      .addField('Length', `${song.time}`)
      .addField('Description', `${song.description}`)

    queueDB.get(vc.guild.id).textChannel.send({ embeds: [Response] })
  } else {
    queueDB.get(vc.guild.id).connection.destroy()
    queueDB.get(vc.guild.id).player.stop()
    queueDB.delete(vc.guild.id)
    const Response = new MessageEmbed()
      .setColor('BLURPLE')
      .setDescription('👋 We are all done! Music complete!')
    oldtext.send({ embeds: [Response] })
  }
}
