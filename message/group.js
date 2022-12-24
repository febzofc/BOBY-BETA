const axios = require("axios")  
const fs = require('fs')
const { getBuffer , tanggal } = require("../lib/myfunc");
const { makeWelcome, makeGodbyee } = require('./welcome.js')
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Makasar").locale("id");
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')

module.exports = async(bob, anu) => {
try{
  
let metadata = await bob.groupMetadata(anu.id)
let participants = anu.participants

for (let num of participants) {

try {
ppuser = await bob.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/78757a3eb7a7da1a3cdb7.jpg'
}

let shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${ppuser}`)

let chat = global.db.data.chats[anu.id] || {}

if (anu.action == 'add') {
console.log('Ada yang masuk gc om:V')
await makeWelcome(bob, num, metadata.subject).then(async(res) => {   
         if(res){
         var button = [
             { 
              buttonId: `ahsudahlah`, 
              buttonText: { 
               displayText: `Welcome👋` 
               }, type: 1 
              }
             ]             
         await bob.sendMessage(
         anu.id, 
         { 
         caption: `*Hello @${num.split("@")[0]} Welcome to ${metadata.subject} \n\nDon't forget to get acquainted with the admin here\nfan don't forget to obey the rules in this group*`, 
         image: res,
         buttons: button, 
         footer: 'Made with ❣️', mentions: [num] })        
         }
         })         
         } 
 else if (anu.action == 'remove') {  
 console.log('Ada yang keluar gc om:V')
        await makeGodbyee(bob, num, metadata.subject).then(async(res) => {   
          if(res){
          var button = [
             { 
              buttonId: `ahsudahlah`, 
              buttonText: { 
               displayText: `Bye👋` 
               }, type: 1 
              }
             ]
        await bob.sendMessage(
           anu.id, 
          { 
           caption: `*@${num.split("@")[0]} leave the group ${metadata.subject}\nWhy did he come out huh?, ummm...`, 
           image: res,
           buttons: button, 
           footer: 'Made with ❣️', 
           mentions: [num] 
             }
             )
             }
             })
             
            }
           }
}catch (e) {
console.log(e)
}
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update ${__filename}`)
	delete require.cache[file]
	require(file)
})