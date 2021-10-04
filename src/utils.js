const moment = require('moment')
require('moment-timezone')
moment.tz.setDefault('Australia/Melbourne')
const fetch = require('node-fetch')
const EventEmitter = require('events')

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const locks = {}, caches = {}

String.prototype.format = (function (i, safe, arg) {
  function format () {
    var str = this; var len = arguments.length + 1
    for (i = 0; i < len; arg = arguments[i++]) {
      safe = typeof arg === 'object' ? JSON.stringify(arg) : arg
      str = str.replace(RegExp('\\{' + (i - 1) + '\\}', 'g'), safe)
    }
    return str
  }
  format.native = String.prototype.format
  return format
}())

module.exports = {
  encodeName: name => name.toLowerCase().replace(/[^\w\d ]/g, '-').replace(/  */g, '-').replace(/--+/g, '-'),
  pad: (data, length, filler='0') => Array(length).fill(filler).concat([...data.toString()]).slice(-length).join(''),
  getYYYYMMDD: time => {
    return time.format('YYYYMMDD')
  },
  getYYYYMMDDNow: () => module.exports.getYYYYMMDD(module.exports.now()),
  now: () => moment.tz('Australia/Melbourne'),
  getHHMM: time => {
    return time.format('h:mm')
  },
  parseTime: (time, format) => {
    if (format)
      return moment.tz(time, format, 'Australia/Melbourne')
    else
      return moment.tz(time, 'Australia/Melbourne')
  },
  request: async (url, options={}) => {
    let start = +new Date()

    let body
    let error

    let maxRetries = (options ? options.maxRetries : null) || 3

    let fullOptions = {
      timeout: 2000,
      compress: true,
      highWaterMark: 1024 * 1024,
      ...options
    }

    for (let i = 0; i < maxRetries; i++) {
      try {
        body = await fetch(url, fullOptions)

        break
      } catch (e) {
        error = e
      }
    }

    if (!body && error) throw error

    let end = +new Date()
    let diff = end - start

    let size = body.headers.get('content-length')
    let returnData = await (options.raw ? body.buffer() : body.text())
    if (!size) size = returnData.length

    let logMessage = `${diff}ms ${url} ${size}R`
    console.log(logMessage)

    return returnData
  },
  getDistanceFromLatLon: (lat1, lon1, lat2, lon2) => {
    var R = 6371 // Radius of the earth in km
    var dLat = module.exports.deg2rad(lat2-lat1)
    var dLon = module.exports.deg2rad(lon2-lon1)
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(module.exports.deg2rad(lat1)) * Math.cos(module.exports.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    var d = R * c // Distance in km
    return Math.floor(d * 1000) // distance in m
  },
  deg2rad: deg => {
    return deg * (Math.PI/180)
  },
  getData: async (lock, key, noMatch, ttl=1000 * 60) => {
    if (!locks[lock]) locks[lock] = {}
    if (!caches[lock]) caches[lock] = new TimedCache(ttl)

    if (locks[lock][key]) {
      return await new Promise((resolve, reject) => {
        locks[lock][key].on('loaded', resolve)
        locks[lock][key].on('fail', e => {
          reject(e)
        })
      })
    }
    if (caches[lock].get(key)) {
      return caches[lock].get(key)
    }

    locks[lock][key] = new EventEmitter()
    locks[lock][key].setMaxListeners(1000)

    let data

    try {
      data = await noMatch()
    } catch (e) {
      console.error('Getting data for', lock, 'for key', key, 'failed', e)
      locks[lock][key].emit('fail', e)
      delete locks[lock][key]
      throw e
    }

    caches[lock].put(key, data)
    locks[lock][key].emit('loaded', data)
    delete locks[lock][key]

    if (ttl !== caches[lock].getTTL()) caches[lock].setTTL(ttl)

    return data
  },
  sleep: time => {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
}

class TimedCache {

  constructor(ttl) {
    this.ttl = ttl
    this.cache = {}
    setInterval(() => {
      Object.keys(this.cache).forEach(key => {
        this.get(key)
      })
    }, 1000 * 60)
  }

  get(key) {
    let holder = this.cache[key]
    if (holder) {
      if (new Date() - holder.created > this.ttl) {
        delete this.cache[key]
        return null
      } return this.cache[key].obj
    } else return null
  }

  put(key, value) {
    this.cache[key] = {
      created: new Date(),
      obj: value
    }
  }

  getTTL() {
    return this.ttl
  }

  setTTL(ttl) {
    this.ttl = ttl
  }
}

module.exports.TimedCache = TimedCache
