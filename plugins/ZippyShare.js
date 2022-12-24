let fs = require('fs');
let getLink = require('../lib/zippyshare.js');
let { getBuffer, getRandom, sleep } = require('../lib/myfunc');

let zippy = async(M, q, msg, sendFile, bob) => {
try { 
  if(!q) return M.reply('「 ❗ 」masukan parameter url')
  M.reply('「 ❗ 」downloading')
   let res = await getLink(q)
   
       let bup = await getBuffer(res.url)
   	    let ranV = getRandom('.mp4')
        await fs.writeFileSync('./' + ranV, bup)
        const buff = './' + ranV
       
          let vid = {
          document: {
           url: buff

           },      
          fileName: `${res.name}`,
          mimetype: 'video/mp4',
          contextInfo:{
           externalAdReply:{
             title: res.url,
             body: `result`,
             thumbnail: fs.readFileSync('./media/boby.jpg'),
             sourceUrl: "https://instagram.com/pebri_elja",
             mediaUrl: "https://instagram.com/pebri_elja",
             renderLargerThumbnail: false,
             showAdAttribution: true,
             mediaType: 1
            }
           }
         }
         bob.sendMessage(M.chat, vid, { quoted : msg })                  
         setTimeout(() => { fs.unlinkSync(buff) }, 10000)          
} catch (e) {
console.log(e)
M.reply('「 ❗ 」link invalid')
}
}
module.exports = zippy