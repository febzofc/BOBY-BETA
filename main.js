// THANKS TO DIKA ARDNT.

"use strict";
require('./message/config')
const { default: WASocket,               
        DisconnectReason,                 
        fetchLatestBaileysVersion,          
        useMultiFileAuthState,
        generateForwardMessageContent,        
        generateWAMessageFromContent,         
        proto,
        downloadContentFromMessage 
        } = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const { existsSync, watchFile } = require('fs')
const path = require('path')
const chalk = require('chalk')
const fetch = require('node-fetch')
const FileType = require('file-type');
const Pino = require('pino')
const yargs = require('yargs')
const CFonts  = require('cfonts')
const store = require('./store')
const help = require('./plugins/_menu')
const syntaxerror = require('syntax-error')
const { color, bobLog } = require("./lib/color");

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, formatp, sleep, getBuffer } = require('./lib/myfunc')

//----> Jangan di ubah nanti error
existsSync('./data_load/baileys_store.json') && store.readFromFile('./data_load/baileys_store.json')
setInterval(() => {
    store.writeToFile('./data_load/baileys_store.json')
}, 10000)

//----> get function api
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.db = new (require('./lib/database'))(`${opts._[0] ? opts._[0] + '_' : ''}database.json`, null, 2)
global.db.data = {
users: {},
chats: {},
database: {},
absen: {},
cmd: {},
settings: {},
...(global.db.data || {})
}

//-----> Plugins 
let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    console.log(e)
    delete global.plugins[filename]
  }
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

//-----> SYSTEM PLUGINS
global.reload = (_event, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) console.log(color(`Done Update plugins '${filename}'`, 'aqua'))
      else {
        console.log(color(`deleted plugin '${filename}'`, 'yellow'))
        return delete global.plugins[filename]
      }
    } else console.log(color(`requiring new plugin '${filename}'`, 'lime'))
    let err = syntaxerror(fs.readFileSync(dir), fs.existsSync(dir) ? filename : 'Execution Function')
    if (err) console.log(color(`syntax error while loading '${filename}'\n${err}`, 'red'))
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      console.log(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
//----> END

//----> Function QR & Run
const start = async () => {
const { state, saveCreds } = await useMultiFileAuthState(path.resolve(`${global.sessionName}-session`), Pino({ level: 'silent' }))
CFonts.say('BOBY', {
  font: 'simple3d',
  align: 'center',
  gradient: ['red', 'magenta']
})
CFonts.say(`By @Febriansyah`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})
console.log('\x1b[1;31m×\x1b[1;37m>', '<\x1b[1;32m🤖︎\x1b[1;37m>', color('WARNING'), 'Reading plugins...')	
await sleep(3000)
console.log(Object.keys(global.plugins))
let { version, isLatest } = await fetchLatestBaileysVersion()
	 const bob = WASocket({
        printQRInTerminal: true,
        auth: state,
        logger: Pino({ level: 'silent' }),
        version,
    })
    store.bind(bob.ev) 
            
    bob.multi = true 
    bob.nopref = false
    bob.prefa = '/'
          console.log(color('Connected....', 'aqua'))
          bob.ev.on('messages.upsert', async m => {
          if (!m.messages) return
          const msg = m.messages[0]
          const M = smsg(bob, msg)
          switch (M.mtype) {
          case "imageMessage": 
          case "videoMessage":
          case "audioMessage":
          case "stickerMessage":
          case "documentMessage":
          case "senderKeyDistributionMessage":
          if (!M.key.fromMe) await sleep(1000)
          const quoted = M.msg ? M.msg.url : M.quoted.url
          if (!quoted) await bob.refreshMediaConn(true)
          break
} 	
require('./message/bob')(bob, msg, m, M, help)
})



    //----> Function participants group
    bob.ev.on('group-participants.update', async (anu) => {
        require('./message/group')(bob, anu)
    })

    //---->   
    bob.ev.on('chats.set', () => {
        console.log('got chats', store.chats.all().length) //----> gk usah di apus
    })

    bob.ev.on('contacts.set', () => {
        console.log('got contacts', Object.values(store.contacts).length) //----> gk ush di apus
    }) 
    
    let dbJson = JSON.stringify(global.db.data)
        if (!opts['test']) setInterval(() => {
               console.log(chalk.redBright('Reading Database...'))
        if (JSON.stringify(global.db.data) == dbJson) console.log(chalk.redBright('Database Update Now...'))
        else {
              global.db.save()
                console.log(chalk.redBright('Done Update Database...'))
        let dbJson = JSON.stringify(global.db.data)
        }
        }, 120 * 1000) //----> Set Default 


 /** Resize Image
      *
      * @param {Buffer} Buffer (Only Image)
      * @param {Numeric} Width
      * @param {Numeric} Height
      */
      bob.reSize = async (image, width, height) => {
       let jimp = require('jimp')
       var oyy = await jimp.read(image);
       var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
       return kiyomasa
      } 
      
      bob.ev.on('creds.update', saveCreds)
      bob.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'close') {
      console.log(bobLog('connection closed, try to restart'))
      lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
      ? start()
      : console.log(bobLog('Wa web terlogout.'))
      }
})


bob.sendText = (jid, text, quoted = '', options) => bob.sendMessage(jid, { text: text, ...options }, { quoted })

bob.sendImageAsSticker = async (jid, path, quoted, options = {}) => {

let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}



await bob.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

/**
 * 
 * @param {*} jid 
 * @param {*} path 
 * @param {*} quoted 
 * @param {*} options 
 * @returns 
 */


bob.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await bob.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

bob.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {

let quoted = message.msg ? message.msg : message

let mime = (message.msg || message).mimetype || ''
let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType(buffer)
let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}   

bob.send5ButLoc = async (jid , text = '' , footer = '', lok, but = [], options = {}) =>{
      let bb = await bob.reSize(lok, 300, 150)
      bob.sendMessage(jid, { location: { jpegThumbnail: bb }, caption: text, footer: footer, templateButtons: but, ...options })
      }

/**
 * Send Buttons
 * @param {String} jid
 * @param {String} content
 * @param {String} footer
 * @param {String} button1
 * @param {String} row1
 * @param {Object} quoted
 * @param {Object} options
 */

bob.sendButton = async(jid, content, footer, button1, row1, quoted, options = {}) => {
return await bob.sendMessage(jid, {
text: content,
footer: footer,
buttons: [
  { buttonId: row1, buttonText: { displayText: button1 }, type: 1 }
],
headerType: 1
  },{quoted, ...options})
}

bob.send2Button = async(jid, content, footer, button1, row1, button2, row2, quoted, options = {}) => {
return await bob.sendMessage(jid, {
text: content,
footer: footer,
buttons: [
  { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
  { buttonId: row2, buttonText: { displayText: button2 }, type: 1 }
],
headerType: 1
  },{quoted, ...options })
}

   
   
bob.getFile = async (path) => {
let res
let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(data) || {
	mime: 'application/octet-stream',
	ext: '.bin'
}

return {
	res,
	...type,
	data
}
}


bob.sendMedia = async (jid, path, filename, quoted = '', options = {}) => {
	 let { ext, mime, data } = await bob.getFile(path)
	 let messageType = mime.split("/")[0]
	 let pase = messageType.replace('application', 'document') || messageType
	 return await bob.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, fileName: filename+ext ? filename+ext : getRandom(ext), ...options }, { quoted })

}   
   
   
   
/**
 * 
 * @param {*} jid 
 * @param {*} message 
 * @param {*} forceForward 
 * @param {*} options 
 * @returns 
 */
bob.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
	message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
	vtype = Object.keys(message.message.viewOnceMessage.message)[0]
	delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
	delete message.message.viewOnceMessage.message[vtype].viewOnce
	message.message = {
...message.message.viewOnceMessage.message
	}
}

let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await bob.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

bob.cMod = (jid, message, text = '', sender = bob.user.id, options = {}) => {
let copy = message.toJSON()
let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
	...content,
	...options
}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === bob.user.id

return proto.WebMessageInfo.fromObject(copy)
}   
  
return bob
}

start()
.catch(err => console.log(err))
