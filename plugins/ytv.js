let { getBuffer, getRandom, sleep } = require('../lib/myfunc')
let fs = require('fs')
const dl = require("@bochilteam/scraper");

let ytvideo = async(M, reply, q, bobSend, prefix, msg, bob) => {
try {
   if(!q)return reply('link?')      
        
     const yt = await dl.youtubedl(q).catch(async () => await dl.youtubedlv2(q))     
     const dl_url = await yt.video['480p'].download()
          
     var buf = await getBuffer(dl_url)
     var ram = getRandom('.mp4')
     var dat = fs.writeFileSync('./tmp/' + ram, buf)
     var vid = './tmp/' + ram
     
      bob.sendMessage(M.chat, {caption: yt.title, video: { url: vid }}, {quoted: msg})
      
      setTimeout(() => { fs.unlinkSync(vid) }, 3000)
      
   } catch (e) {
     M.reply('「 ❗ 」error!')
     console.log(e)
}
}
module.exports = ytvideo