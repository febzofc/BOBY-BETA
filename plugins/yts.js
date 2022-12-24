let { ytsr } = require ('../lib/ytdl.js')
const yts = require('yt-search' )

let ytsearch = async( M, reply, q, sendFile, sendMsg, bob, prefix ) => {
		    if(!q)return reply('query?')
		    yts(q).then( data => {
				  let yt = data.videos
				  var jumlah = 10
				  if (yt.length < jumlah) jumlah = yt.length
				  var no = 0
				  let txt = `*YOUTUBE SEARCH*

 *Data berhasil didapatkan*
 *Hasil pencarian dari ${q}*
 
 Untuk mengambil Audio/Video dari hasil pencarian
 silahkan salin lalu ketik ${prefix}ytdl`
                for (let i = 0; i < jumlah; i++) {
				  no += 1
				  txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author.name}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
				}													
				var img = `${yt[0].image}`
				sendFile(M.chat, img, txt, M)
				}) .catch(() => reply('Error!!'))

}

module.exports = ytsearch