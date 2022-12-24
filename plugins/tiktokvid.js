const {
    aiovideodl,
    savefrom,
    snapsave
} = require('@bochilteam/scraper')

let ttvid = async(M, q, msg, tag, dat, bob ) => {

 if(!q)return M.reply('masukan parameter url')
  
               
               if (tag == q) {
                     var data = await savefrom(q)                                           
                        bob.sendMessage(M.chat, {
                        video: {
                            url: data[0].url[0].url
                        },
                        caption: `video ID: ${data[0].id}\ntitle: ${data[0].meta.title}\ndurasi: ${data[0].meta.duration}\nsource: ${data[0].meta.source}`,
                        buttons: [{
                                buttonId: `#tiktok mp3|${q}`,
                                buttonText: {
                                    displayText: "Audio/Mp3"
                                },
                                type: 1
                            }                         
                        ],
                        footer: "@bochilteam/scraper"
                    }, {
                        quoted: msg
                    })            
              } if (tag == 'mp3') {
                    
                    var data = await savefrom(dat)
                    bob.sendMessage(M.chat, {document: {url: data[0].url[1].url}, fileName: data[0].meta.title + '.mp3', mimetype: 'audio/mp3'})
                    
              
              }
                
                 

}
module.exports = ttvid