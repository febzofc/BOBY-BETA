let fs = require('fs');
let kusonime = require('../lib/kusonime');

let kuso = async(M, q, msg, reply, bob) => {
try{
if (!q) return M.reply('query?')
 let anim = await kusonime(q)
 const { judul, thumb, deks, genre, status, produser, rate, link, tgl_rilis, total_eps, result } = anim.result
 
let cp = `*Kusonime*

_judul : ${judul}_
_genre : ${genre}_
_status : ${status}_
_totak eps : ${total_eps}_
_produser : ${produser}_
_rating : ${rate}_
_rilis : ${tgl_rilis}_
_source : ${link}_`

bob.sendMessage(M.chat, {
				   image: { url: thumb },
				   caption: cp,
				   buttons: [{buttonId: `#batchkusonime ${judul}`, buttonText: { displayText: "Batch!" }, type: 1 }],
				   footer: 'kusonime scrape by caliph❣️'
			      }, { quoted: msg })			    
 } catch (e) {
console.log(e)
M.reply('Anime tidak ditemukan')
}
}
module.exports = kuso