let fs = require('fs')
let QRCode = require('qrcode')
let { sleep } = require('../lib/myfunc')

/**
 * Text To Qrcode © Febriansyah 
 * @param {String} text teks to qr
 
 **/
 
function QRgenerate(text){
   QRCode.toDataURL(text, { scale: 8 })
       .then(url => {
        let buffer = new Buffer.from(url.replace('data:image/png;base64,', ''), 'base64')
        fs.writeFileSync('./media/Results.png', buffer)
        return fs.readFileSync('./media/Results.png')
        setTimeout(() => { fs.unlinkSync('./media/Results.png') }, 3000)
  })
  .catch(err => {
    console.error(err)
  })
  }


let QRgen = async(M, q, bob) => {
if (!q) return M.reply('Teks nya kak?')
  await QRgenerate(q)
  await sleep(3000)
  var done = fs.readFileSync('./media/Results.png')
  bob.sendMessage(M.chat, { caption: '[❗] Done ngab\n\nPesan : ' + q, image: done })
  setTimeout(() => { fs.unlinkSync('./media/Results.png') }, 3000)
 
}
module.exports = QRgen
