let { fetchJson } = require('../lib/myfunc')
let fs = require('fs')
require('../message/config')


let lirik = async(q , sendFile , M , textImg , sendMess) => {
try {

if (!q) return M.reply('masukan lirik/judul lagu') 
 fetchJson(`https://some-random-api.ml/lyrics?title=${q}`).then(res => {
 sendFile(M.chat, res.thumbnail.genius, res.lyrics, M)
})

} catch (e) {
M.reply('lirik tidak ditemuakn')
}
}

module.exports = lirik
