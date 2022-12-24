let { pinterest } = require('../lib/anime');


let pinte = async(M, q, prefix, msg, bob) => {
try {
  if(!q) return M.reply('「 ❗ 」example : #pinterest siesta tantei wa mou shinderu')
  pinterest(q).then(res => {

  var result = res[Math.floor(Math.random() * res.length)]
  
  bob.sendMessage(M.chat, {
                        image: {
                            url: result
                        },
                        caption: q,
                        buttons: [{
                                buttonId: `${prefix}pin ${q}`,
                                buttonText: {
                                    displayText: "NEXT➡️"
                                },
                                type: 1
                            }
                        ],
                        footer: 'made by❣️pinterest'
                    }, {
                        quoted: msg
                    })
                
  
  })
} catch(e) {
M.reply(e)
}
}
module.exports = pinte