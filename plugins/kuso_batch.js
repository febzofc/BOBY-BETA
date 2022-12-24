let kusonime = require('../lib/kusonime');

let kuso_batch = async(M, q, prefix, msg, bob) => { 
   if(!q) return M.reply('Masukan parameter link')
   
   let kuso = await kusonime(q)    
   let { link } = kuso.result.result
   let hasil = ``
   for(let i of link) {
   hasil +=`\n\n📥Download: ${i}`
   }
   M.reply(hasil)
}
module.exports = kuso_batch