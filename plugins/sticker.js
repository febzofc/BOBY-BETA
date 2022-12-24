let fs = require('fs')
require('../message/config');

let stickers = async(textImg, quoted, mime, bob, M) => {
if (!quoted)return textImg(`Balas Video/Image Dengan Caption !sticker`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await bob.sendImageAsSticker(M.chat, media, M, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await bob.sendVideoAsSticker(M.chat, media, M, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
textImg(`Kirim Gambar/Vide:o Dengan Caption !sticker \nDurasi Video 1-9 Detik Atau Reply Media Yang Dikirim`)
}
}

module.exports = stickers
