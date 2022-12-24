let fs = require('fs')
let { UploadFileUgu } = require('../lib/uploader')
let { getRandom } = require('../lib/myfunc');

let teleph = async(M, prefix, quoted, mime, msg, bob) => {
try {
let q1 = M.quoted ? M.quoted : M
if (!mime)return M.reply(`Balas Video/Image Dengan Caption !sticker`)
M.reply('process...')
if (/image/.test(mime)) {
 let media = await quoted.download()
 let buf = media.toString('base64')
 let ranV = getRandom('.png')
     await fs.writeFileSync('./tmp/' + ranV, Buffer.from(buf, "base64")) 
 let rs = "./tmp/" + ranV
 let teph = await UploadFileUgu(rs)
M.reply(`Buat apa tuh om?👀\n\n_hash : ${teph.hash}_\n_name : ${teph.name}_\n_url : ${teph.url}_\n_size : ${teph.size}_`)
await fs.unlinkSync(rs)
}
} catch (e) {
 M.reply('「 ❗ 」reply media')
 console.log(e)
}
}

module.exports = teleph
