let fs = require('fs')
const { TelegraPh } = require('../lib/uploader')

let teleph = async(M, prefix, quoted, mime, msg, bob) => {
try {
let q1 = M.quoted ? M.quoted : M
if (!mime)return M.reply(`Balas Video/Image Dengan Caption !sticker`)
if (/image/.test(mime)) {
let buff = await bob.downloadAndSaveMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
 let teph = await TelegraPh(buff)
M.reply('Buat apa tuh om?👀\n\nresult :' + teph)
await fs.unlinkSync(buff)
}
} catch (e) {
 M.reply('「 ❗ 」reply media')
 console.log(e)
}
}

module.exports = teleph
