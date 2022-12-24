let fs = require('fs')
let { fetchJson } = require('../lib/myfunc')
let { TelegraPh } = require('../lib/uploader')

let QRread = async(M, quoted, mime, msg, bob) => {
try {

let q1 = M.quoted ? M.quoted : M
if (!mime)return M.reply(`Reply gambar QR code`)
if (/image/.test(mime)) {
let buff = await bob.downloadAndSaveMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
 let teph = await TelegraPh(buff)
 fetchJson(`https://api.qrserver.com/v1/read-qr-code/?fileurl=${teph}`).then(res => {
 M.reply(`Type: ${res[0].type}\n\nData: ${res[0].symbol[0].data}`)
})
await fs.unlinkSync(buff)
}
} catch (e) {
 M.reply('「 ❗ 」reply the qrcode image')
}
}

module.exports = QRread
