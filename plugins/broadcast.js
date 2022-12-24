let { smsg , sleep } = require('../lib/myfunc')

let bcgc = async(M , q , bob, isOwner) => {
if(!isOwner)return textImg('Only Owner')
let getGroups = await bob.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
cc = await smsg(bob, q ? M : M.quoted ? await M.quoted.fakeObj : false || M)
cck = q ? q : cc.q
M.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 1.5} detik`)
for (let i of anu) {
await sleep(1500)
await bob.copyNForward(i, bob.cMod(M.chat, cc, /|broadcast|bcgc/i.test(cck) ? cck : `*𝘽𝙧𝙤𝙖𝙙𝘾𝙖𝙨𝙩*\n\n ${cck}`), true).catch(_ => _)
}
M.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}

let tags = 'owner';
module.exports = bcgc
