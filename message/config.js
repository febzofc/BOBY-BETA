const fs = require('fs')

// report owner
global.report = {
        err: '*REPORT ERROR FOTUR*',
}

// Nomor Owner
global.ownerNumber = ["6285849261085@s.whatsapp.net"]
global.owner = ["6285849261085"]
global.ownerName = ["Febriansyah"]

global.gamewaktu = '60'
global.limitCount = '50'

global.gcount = {
	prem: '35',
	user: '15'
}

// Setting Bot
global.botName = 'Boby - Bot'
global.sessionName = 'boby'


// EXIF
global.packname = 'BOBY'
global.author = 'PebriSyalan️'

//List Menu
global.listmenu = { 
    user_data : ["ceklimit","buylimit","topbalance"],
    group : ["group","setpp","revoke","tagall","leave","absenstart","absen","cekabsen","delabsen"],
    owner : ["mode"],
    media : ["sticker","swm","smeme","toimg"],
    random : ["alay","namaninja"],
    fun : ["suit","calculator"],
    stalker: ["lirik","ytstalk","githubstalk"],
    searching : ["pinterest"],
    download : ["ytmp4","ytmp3","tiktok","zippyshare"],
    anime : ["kusonime", "otakudesu","whatanime"],
    generator : ["tourl", "tourl2", "qrgenerator","qrreader"],
    game : ["tebakgambar", "akinator"]
}

// OTHERS
global.Mode = 'Public'
global.mess = {
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    query: 'Command harus disertai Query..',
    link: 'Command harus disertai Link/Url',
    wait: '```「▰▰▰▱▱▱▱▱▱▱」Loading...```',
    done: 'Berhasil..',
    wrongFormat: 'Perintah Salah!!\nSertakan Link setelah Command..'
}



// Path Img/Media
global.pathImg = fs.readFileSync('./media/boby.jpg')
global.fakeImg = fs.readFileSync('./media/boby.jpg')
global.wem = fs.readFileSync('./credits.txt');
global.fpoll = {
            key: {
            participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast'
            },
              message: {
              pollCreationMessage: {
              name: "YouTube FebZabotz" ,
            }
          }
        }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update ${__filename}`)
	delete require.cache[file]
	require(file)
})