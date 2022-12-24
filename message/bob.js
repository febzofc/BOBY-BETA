"use strict";

require('./config')
process.on('uncaughtException', console.error)

//Module
const {
    default: makeWASocket,
    WASocket,
    AuthenticationState,
    WAMessage,
    Contact,
    areJidsSameUser,
    SocketConfig,
    DisconnectReason,
    BaileysEventMap,
    GroupMetadata,
    AnyMessageContent,
    MessageType,
    MiscMessageGenerationOptions,
    BufferJSON,
    delay,
    proto,
    useSingleFileAuthState,
    downloadContentFromMessage,
    WAMessageStubType,
    generateWAMessage,
    generateWAMessageFromContent
} = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const {
    Aki
} = require('aki-api');
const {
    fromBuffer
} = require('file-type')
const Jimp = require('jimp')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const moment = require("moment-timezone");

const {
    exec,
    spawn
} = require("child_process");
const axios = require('axios')
const speed = require('performance-now')
const os = require('os')
const {
    performance
} = require('perf_hooks')
const ffmpeg = require('fluent-ffmpeg')
const yts = require('yt-search')
const fetch = require('node-fetch')

//Library
const {
    color,
    bgcolor
} = require("../lib/color");
const {
    smsg,
    formatp,
    getBuffer,
    fetchJson,
    fetchText,
    getRandom,
    getGroupAdmins,
    runtime,
    sleep,
    tanggal,
    clockString
} = require("../lib/myfunc");
const skrep = require('../lib/scrape')
const {
    yta,
    ytv,
    upload
} = require("../lib/ytdl");
const {
    UploadFileUgu,
    webp2mp4File,
    TelegraPh
} = require('../lib/uploader')
const {
    addPlayGame,
    getJawabanGame,
    isPlayGame,
    cekWaktuGame,
    getGamePosi
} = require("../lib/games");
const games = require('../lib/game');

//----> Limit & Balance
const {
    isLimit,
    limitAdd,
    getLimit,
    giveLimit,
    addBalance,
    kurangBalance,
    getBalance,
    isGame,
    gameAdd,
    givegame,
    cekGLimit
} = require("../lib/limit");
const _prem = require("../lib/premium");
const msgFilter = require('../lib/msgFilter')
const tebakgambar = []
let akinator = []
//----> Database 
let listmenu = global.listmenu //JSON.parse(fs.readFileSync('./lib/listmenu.json'))
let premium = JSON.parse(fs.readFileSync('./data_load/premium.json'));
let balance = JSON.parse(fs.readFileSync('./data_load/balance.json'));
let limit = JSON.parse(fs.readFileSync('./data_load/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./data_load/glimit.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async (bob, msg, m, M, help) => {
    let {
        mentioned
    } = msg
    try {
        let {
            limitCount,
            gamewaktu
        } = global
        let timeout = 60000
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
        const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const from = msg.key.remoteJid
        const content = JSON.stringify(msg.message)

        const chats = (M.mtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (M.mtype == 'imageMessage') ? msg.message.imageMessage.caption : (msg.mtype == 'videoMessage') ? msg.message.videoMessage.caption : (msg.mtype == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (msg.mtype == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.mtype == 'listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (msg.mtype == 'templateButtonReplyMessage') ? msg.message.templateButtonReplyMessage.selectedId : (msg.mtype === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId || msg.text) : ''

        if (bob.multi) {
            var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#%^&.+-,\/\\©^]/gi) : '#'
        } else {
            if (bob.nopref) {
                prefix = ''
            } else {
                prefix = bob.prefa
            }
        }

        const command = chats.toLowerCase().split(' ')[0] || ''
        const args = chats.trim().split(/ +/).slice(1)

        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
        const pushname = msg.pushName || "No Name"
        const isCmd = command.startsWith(prefix)
        const run = process.uptime()
        const q = args.join(" ")
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = bob.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await bob.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isOwner = ownerNumber.includes(sender)
        const isNumber = x => typeof x === 'number' && !isNaN(x)
        const isUser = global.db.data.users[sender] || false
        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)


        const gcounti = global.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user



        //const mentionUser = [...new Set([...(m.mentionedJid || []), ...(M.quoted ? [M.quoted.sender] : [])])]

        const mentionByTag = M.mtype == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByreply = M.mtype == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByreply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []

        const isUrl = (uri) => {
            return uri.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }

        const jsonformat = (json) => {
            return JSON.stringify(json, null, 2)
        }

        const antibot = M.isBaileys
        if (antibot === true) return
        const quoted = M.quoted ? M.quoted : M
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)

        const isWebp = (M.mtype === 'imageMessage' || M.mtype === 'videoMessage')
        const isImage = (M.mtype == 'imageMessage')
        const isVideo = (M.mtype == 'videoMessage')
        const isSticker = (M.mtype == 'stickerMessage')
        const isQuotedMsg = (M.mtype == 'extendedTextMessage')
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
        const isQuotedTag = isQuotedMsg ? content.includes('mentionedJid') ? true : false : false
        const isQuotedReply = isQuotedMsg ? content.includes('Message') ? true : false : false


        // Premium
        _prem.expiredCheck(bob, premium)

        if (global.Mode === 'Self') {
            if (!isOwner) return
        }

        function parseMention(text) {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
        }

        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }

        function mSpace(string) {
            return '```' + string + '```'
        }

        function randomNomor(min, max = null) {
            if (max !== null) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
                return Math.floor(Math.random() * min) + 1
            }
        }


        // DATABASE
        try {
            let users = global.db.data.users[M.sender]
            if (typeof users !== 'object') global.db.data.users[M.sender] = {}
            if (users) {
                if (!isNumber(users.afkTime)) users.afkTime = -1
                if (!('banned' in users)) users.banned = false
                if (!('afkReason' in users)) users.afkReason = ''
            } else global.db.data.users[M.sender] = {
                afkTime: -1,
                banned: false,
                afkReason: '',
            }

            let chats = global.db.data.chats[M.chat]
            if (typeof chats !== 'object') global.db.data.chats[M.chat] = {}
            if (chats) {
                if (!('setWelcome' in chats)) chats.setWelcome = ''
                if (!('setLeave' in chats)) chats.setLeave = ''
            } else global.db.data.chats[M.chat] = {
                setWelcome: '',
                setLeave: '',
            }

            let settings = global.db.data.settings[botNumber]
            if (typeof settings !== 'object') global.db.data.settings[botNumber] = {}
            if (settings) {
                if (!('available' in settings)) settings.available = false
                if (!('composing' in settings)) settings.composing = false
                if (!('recording' in settings)) settings.recording = false
            } else global.db.data.settings[botNumber] = {
                available: false,
                composing: false,
                recording: false,
            }
        } catch (err) {
            console.log(err)
        }


        // STATUS BOT
        const used = process.memoryUsage()
        const cpus = os.cpus().map(cpu => {

            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
            return cpu
        })
        const cpu = cpus.reduce((last, cpu, _, {
            length
        }) => {
            last.total += cpu.total
            last.speed += cpu.speed / length
            last.times.user += cpu.times.user
            last.times.nice += cpu.times.nice
            last.times.sys += cpu.times.sys
            last.times.idle += cpu.times.idle
            last.times.irq += cpu.times.irq
            return last
        }, {
            speed: 0,
            total: 0,
            times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0
            }
        })

        /*<--------------------( akinator )--------------------->*/
const _0x19a351 = _0xf175;
(function(_0x45c8f5, _0x44830c) {
    const _0x34a913 = _0xf175,
        _0x3f7160 = _0x45c8f5();
    while (!![]) {
        try {
            const _0x21be58 = -parseInt(_0x34a913(0x114)) / 0x1 + parseInt(_0x34a913(0x103)) / 0x2 + parseInt(_0x34a913(0x112)) / 0x3 * (-parseInt(_0x34a913(0x109)) / 0x4) + -parseInt(_0x34a913(0x118)) / 0x5 * (-parseInt(_0x34a913(0x102)) / 0x6) + -parseInt(_0x34a913(0x120)) / 0x7 * (-parseInt(_0x34a913(0xff)) / 0x8) + -parseInt(_0x34a913(0x11b)) / 0x9 + parseInt(_0x34a913(0x10b)) / 0xa * (-parseInt(_0x34a913(0x10a)) / 0xb);
            if (_0x21be58 === _0x44830c) break;
            else _0x3f7160['push'](_0x3f7160['shift']());
        } catch (_0x3f2e7c) {
            _0x3f7160['push'](_0x3f7160['shift']());
        }
    }
}(_0x5ae5, 0x66916));

function _0xf175(_0x58305a, _0x4d3539) {
    const _0x5ae594 = _0x5ae5();
    return _0xf175 = function(_0xf1753, _0x54f291) {
        _0xf1753 = _0xf1753 - 0xfc;
        let _0x1d37d4 = _0x5ae594[_0xf1753];
        return _0x1d37d4;
    }, _0xf175(_0x58305a, _0x4d3539);
}
if (fs['existsSync'](_0x19a351(0x110) + from + _0x19a351(0x10d))) {
    if (msg[_0x19a351(0x10e)] in akinator && !isCmd && ['0', '1', '2', '3', '4', '5', '6'][_0x19a351(0x113)](chats)) try {
        let ans = Math[_0x19a351(0x11a)](Number(chats));
        if (ans > 0x0 && ans < 0x7) {
            if (ans == 0x6) {
                if (akinator[msg[_0x19a351(0x10e)]][_0x19a351(0x101)] == 0x0) return msg[_0x19a351(0x11e)](_0x19a351(0x10f));
                await akinator[msg[_0x19a351(0x10e)]][_0x19a351(0x117)]();
            } else await akinator[msg[_0x19a351(0x10e)]][_0x19a351(0x106)](ans - 0x1);
            if (akinator[msg[_0x19a351(0x10e)]][_0x19a351(0x11f)] >= 0x53 || akinator[msg[_0x19a351(0x10e)]][_0x19a351(0x101)] >= 0x4e) {
                await akinator[msg[_0x19a351(0x10e)]][_0x19a351(0x121)](), await bob[_0x19a351(0xfd)](from, {
                    'image': {
                        'url': akinator[msg[_0x19a351(0x10e)]][_0x19a351(0x107)][0x0][_0x19a351(0xfc)]
                    },
                    'caption': _0x19a351(0x104) + akinator[msg[_0x19a351(0x10e)]]['answers'][0x0][_0x19a351(0x11c)] + _0x19a351(0x116) + akinator[msg[_0x19a351(0x10e)]]['answers'][0x0][_0x19a351(0x100)]
                }, {
                    'quoted': msg
                }), delete akinator[msg[_0x19a351(0x10e)]], fs[_0x19a351(0x108)](_0x19a351(0x110) + from + _0x19a351(0x10d));
                return;
            }
            let mess = '*Progress:\x20' + akinator[msg[_0x19a351(0x10e)]][_0x19a351(0x11f)]['toFixed'](0x2) + '%*\x0a\x20\x20\x20\x20\x20' + akinator[msg['sender']][_0x19a351(0x10c)] + _0x19a351(0xfe);
            const buttons = [{
                    'buttonId': prefix + _0x19a351(0x105),
                    'buttonText': {
                        'displayText': 'Berhenti\x20Bermain'
                    },
                    'type': 0x1
                }],
                buttonMessage = {
                    'text': mess,
                    'footerText': _0x19a351(0x11d),
                    'buttons': buttons,
                    'headerType': 0x1
                };
            bob['sendMessage'](M[_0x19a351(0x119)], buttonMessage);
        }
    } catch (_0xe81a68) {
        msg[_0x19a351(0x11e)](_0x19a351(0x115)), console[_0x19a351(0x111)](_0xe81a68);
    }
}

function _0x5ae5() {
    const _0x5312f4 = ['767154KqfNro', 'Terjadi\x20error,\x20game\x20dibatalkan', '\x0aDeskripsi:\x20', 'back', '4435duEjiP', 'chat', 'floor', '1282626OpQyWm', 'name', 'Hello\x20Owner', 'reply', 'progress', '9415sRSyWW', 'win', 'absolute_picture_path', 'sendMessage', '\x0a1.\x20Iya\x0a2.\x20Tidak\x0a3.\x20Tidak\x20tahu\x0a4.\x20Mungkin\x0a5.\x20Mungkin\x20tidak\x0a6.\x20Kembali', '3544yNBgOu', 'description', 'currentStep', '4812Lpybhe', '853460hykCoS', 'Jawaban\x20:\x20', 'cencelakinator', 'step', 'answers', 'unlinkSync', '4lAlhKP', '22fJoVYj', '126290rZLfoQ', 'question', '.json', 'sender', 'anda\x20blum\x20menjawab\x20pertanyaan\x20apapun', './data_load/', 'log', '1136685RAvtUX', 'includes'];
    _0x5ae5 = function() {
        return _0x5312f4;
    };
    return _0x5ae5();
}



        const reply = (teks, men) => {
            return bob.sendMessage(from, {
                text: teks,
                mentions: men ? men : []
            }, {
                quoted: msg
            })
        }

        const replyNtag = (teks) => {
            bob.sendMessage(from, {
                text: teks,
                mentions: parseMention(teks)
            }, {
                quoted: msg
            })
        }

        const textImg = (teks, buffer = fs.readFileSync(global.pathImg), mess, men) => {
            return bob.sendMessage(from, {
                text: teks,
                jpegThumbnail: buffer,
                mention: men ? men : []
            }, {
                quoted: mess ? mess : msg
            })
        }

        const sendMess = (from, teks) => {
            return bob.sendMessage(from, {
                text: teks
            })
        }

        const sendRespon = (respon) => {
            return bob.sendMessage(from, {
                sticker: fs.readFileSync(`./media/sticker/${respon}.webp`)
            }, {
                quoted: msg
            })
        }

        const sendLimit = () => {
            return bob.sendMessage(from, {
                sticker: fs.readFileSync('./media/sticker/limit.webp')
            }, {
                quoted: msg
            })
        }


        const fake = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(from ? {
                    remoteJid: "6283102650464-1589321480@g.us"
                } : {})
            },
            message: {
                "extendedTextMessage": {
                    "text": `*Hallo* _${pushname} 👋_\n	╰≻ ${prefix + command}`,
                    "title": `Hmm`,
                    'jpegThumbnail': global.pathImg
                }
            }
        }

        const nay1 = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                ...(from ? {
                    remoteJid: "status@broadcast"
                } : {})
            },
            message: {
                contactMessage: {
                    displayName: `Selamat ${salam}\n☏User: ${pushname}`,
                    vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + `item1.TEL;waid=${sender.split("@")[0]}:+${sender.split("@")[0]}\n` + 'item1.X-ABLabel:Ponsel\n' + 'END:VCARD'
                }
            }
        }


        const sendFile = async (from, url, caption, msg, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return bob.sendMessage(from, {
                    video: await convertGif(url),
                    caption: caption,
                    gifPlayback: true,
                    mentions: men ? men : []
                }, {
                    quoted: msg
                })
            }
            let type = mime.split("/")[0] + "Message"
            if (mime.split("/")[0] === "image") {
                return bob.sendMessage(from, {
                    image: await getBuffer(url),
                    caption: caption,
                    mentions: men ? men : []
                }, {
                    quoted: msg
                })
            } else if (mime.split("/")[0] === "video") {
                return bob.sendMessage(from, {
                    video: await getBuffer(url),
                    caption: caption,
                    mentions: men ? men : []
                }, {
                    quoted: msg
                })
            } else if (mime.split("/")[0] === "audio") {
                return bob.sendMessage(from, {
                    audio: await getBuffer(url),
                    caption: caption,
                    mentions: men ? men : [],
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: msg
                })
            } else {
                return bob.sendMessage(from, {
                    document: await getBuffer(url),
                    mimetype: mime,
                    caption: caption,
                    mentions: men ? men : []
                }, {
                    quoted: msg
                })
            }
        }

        //bob.sendReadReceipt(from, sender, [msg.key.id])

        bob.typeMediaUrl = async (url) => {
            let memek = '';
            let mekres = await axios.head(url)
            memek = mekres.headers['content-type']
            console.log(memek)
            if (memek.split("/")[1] === "gif") {
                return `video`
            }
            if (memek === "application/pdf") {
                return `document`
            }
            if (memek.split("/")[0] === "image") {
                return `image`
            }
            if (memek.split("/")[0] === "video") {
                return `video`
            }
            if (memek.split("/")[0] === "audio") {
                return `audio`
            }
        }

        const bobSend = async (from, url, msg) => {
            await bob.typeMediaUrl(url).then((res) => {
                msg.reply('Sending.....')
                getBuffer(url).then(buffer => bob.sendMessage(from, {
                    [res]: buffer
                }, {
                    quoted: msg
                }))
            })
        }

        bob.createMessage = async (jidnya, kontennya, optionnya) => {
            return await generateWAMessage(jidnya, kontennya, {
                ...optionnya,
                userJid: bob.authState.creds.me.id,
                upload: bob.waUploadToServer
            })
        }

        if (isCmd && msgFilter.isFiltered(M.chat) && !isGroup) {
            console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            return reply('「 ❗ 」Sabar Bang 5 Detik/Command')
        }


        if (isCmd) {
            var culur = ['lime', 'aqua', 'yellow', 'magenta']
            var rundum = culur[Math.floor(Math.random() * culur.length)]
            addBalance(sender, 20, balance)
            console.log(color(`「 ❗ 」Command ${command} from ${pushname} in ${M.isGroup ? groupName : 'Private Chat'}`, rundum))
        }

        /*if (M.message) {
        addBalance(sender, 5, balance)
        console.log(chalk.black(chalk.magentaBright('[ PESAN ]')), chalk.black(chalk.greenBright(new Date)), chalk.black('\n' + chalk.whiteBright('=> Command ' + chats || M.mtype)) + '\n' + chalk.greenBright('=> Dari'), chalk.black(chalk.redBright(pushname)), chalk.yellowBright(M.sender) + '\n' + chalk.greenBright('=> Di'), chalk.black(chalk.cyanBright(M.isGroup ? groupName : 'Private Chat', M.chat)))
        }*/

        if (isCmd && !isOwner) msgFilter.addFilter(from)

        if (isOwner) {
            if (chats.startsWith("> ")) {
                console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    reply(`${evaled}`)
                } catch (err) {
                    console.log(color('[❗]', 'red'))
                    reply(`${err}`)
                }
            } else if (chats.startsWith("$ ")) {
                console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
                exec(chats.slice(2), (err, stdout) => {
                    if (err) return reply(`${err}`)
                    if (stdout) reply(`${stdout}`)
                })
            }
        }


        //GAME
        cekWaktuGame(bob, tebakgambar)
        if (isPlayGame(from, tebakgambar) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
                var htgm = randomNomor(50, 100)
                addBalance(sender, htgm, balance)
                reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
                tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
            } else {
                reply('salah')
            }
        }


        // BANNED
        if (db.data.users[M.sender].banned && isCmd) {
            await replyNtag(`Maaf @${M.sender.split("@")[0]} Anda Telah Dibanned, Chat Owner Untuk Un Banned`)
            return
        }

        // Afk
        try {
            for (let jid of mentionUser) {
                let user = global.db.data.users[jid]
                if (!user) continue
                let afkTime = user.afkTime
                if (!afkTime || afkTime < 0) continue
                let reason = user.afkReason || ''
                M.reply(`
Jangan tag dia!
Dia sedang    ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
Selama ${clockString(new Date - afkTime)}
`.trim())
            }

            if (db.data.users[M.sender].afkTime > -1) {
                let user = global.db.data.users[M.sender]
                M.reply(`
Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
Selama ${clockString(new Date - user.afkTime)}
`.trim())
                user.afkTime = -1
                user.afkReason = ''

            }
        } catch {}

        function _0x3725() {
            const _0x489e76 = ['quoted', 'toString', 'isGroup', 'emit', 'fileSha256', 'WebMessageInfo', '541817vcekjD', '12JuXTbL', 'fromObject', '1026636ZmyoVn', 'data', 'pushName', '10emQIEr', 'user', 'sender', 'key', 'fakeObj', 'msg', '2021440ShtdnP', 'fromMe', '5881162CdVdlY', 'append', '197220iwUwKO', '1497618DdogdV', 'chat', 'participant', '10wOXdTy', 'messages.upsert', '4303512zZyIRo', 'base64', 'cmd'];
            _0x3725 = function() {
                return _0x489e76;
            };
            return _0x3725();
        }

        function _0x476b(_0x51cf4e, _0x5dfa94) {
            const _0x3725b0 = _0x3725();
            return _0x476b = function(_0x476bb1, _0x3c4c33) {
                _0x476bb1 = _0x476bb1 - 0xbc;
                let _0x55a5ae = _0x3725b0[_0x476bb1];
                return _0x55a5ae;
            }, _0x476b(_0x51cf4e, _0x5dfa94);
        }
        const _0xa50f35 = _0x476b;
        (function(_0x48760b, _0x4fd5d9) {
            const _0x4214be = _0x476b,
                _0x394911 = _0x48760b();
            while (!![]) {
                try {
                    const _0x4149ad = parseInt(_0x4214be(0xcf)) / 0x1 + parseInt(_0x4214be(0xc4)) / 0x2 * (-parseInt(_0x4214be(0xc0)) / 0x3) + parseInt(_0x4214be(0xd2)) / 0x4 + parseInt(_0x4214be(0xbc)) / 0x5 * (parseInt(_0x4214be(0xd0)) / 0x6) + -parseInt(_0x4214be(0xbe)) / 0x7 + parseInt(_0x4214be(0xc6)) / 0x8 + -parseInt(_0x4214be(0xc1)) / 0x9 * (parseInt(_0x4214be(0xd5)) / 0xa);
                    if (_0x4149ad === _0x4fd5d9) break;
                    else _0x394911['push'](_0x394911['shift']());
                } catch (_0x33abc4) {
                    _0x394911['push'](_0x394911['shift']());
                }
            }
        }(_0x3725, 0xc5afb));
        if (isMedia && M[_0xa50f35(0xda)][_0xa50f35(0xcd)] && M[_0xa50f35(0xda)][_0xa50f35(0xcd)]['toString'](_0xa50f35(0xc7)) in global['db'][_0xa50f35(0xd3)][_0xa50f35(0xc8)]) {
            let hash = global['db'][_0xa50f35(0xd3)]['cmd'][M['msg'][_0xa50f35(0xcd)][_0xa50f35(0xca)](_0xa50f35(0xc7))],
                {
                    q,
                    mentionedJid
                } = hash,
                messages = await generateWAMessage(M[_0xa50f35(0xc2)], {
                    'text': q,
                    'mentions': mentionedJid
                }, {
                    'userJid': bob[_0xa50f35(0xd6)]['id'],
                    'quoted': M['quoted'] && M[_0xa50f35(0xc9)][_0xa50f35(0xd9)]
                });
            messages[_0xa50f35(0xd8)][_0xa50f35(0xbd)] = areJidsSameUser(M[_0xa50f35(0xd7)], bob[_0xa50f35(0xd6)]['id']), messages[_0xa50f35(0xd8)]['id'] = M[_0xa50f35(0xd8)]['id'], messages[_0xa50f35(0xd4)] = M[_0xa50f35(0xd4)];
            if (M[_0xa50f35(0xcb)]) messages[_0xa50f35(0xc3)] = M['sender'];
            let msg1 = {
                ...msg,
                'messages': [proto[_0xa50f35(0xce)][_0xa50f35(0xd1)](messages)],
                'type': _0xa50f35(0xbf)
            };
            bob['ev'][_0xa50f35(0xcc)](_0xa50f35(0xc5), msg1);
        }

        async function waterMark(img) {

            Jimp.read(img, (err, gambar) => {
                if (err) throw err;
                Jimp.read('weem.png', (err, watermark) => {
                    if (err) throw err;
                    const ukuranWatermark = gambar.bitmap.width / 5;
                    watermark.resize(ukuranWatermark, Jimp.AUTO);
                    const margin = 10;
                    const x = gambar.bitmap.width - watermark.bitmap.width - margin;
                    const y = gambar.bitmap.height - watermark.bitmap.height - margin;

                    gambar.composite(watermark, x, y, {
                        mode: Jimp.BLEND_SOURCE_OVER,

                    });

                    gambar.write('../tmp/res.jpg');
                    var mage = '../tmp/res.jpg'
                    sleep(1000)

                    bob.sendMessage(from, {
                        image: {
                            url: mage
                        }
                    })

                });
            });
        }

        // COMMAND
        switch (command) {

            case prefix + 'wm':
            case prefix + 'tes': {
                if (!mime) return reply('reply/send media')
                let media = await quoted.download()
                waterMark(media)
                sleep(1000)
                await fs.unlinkSync('../tmp/res.jpg')
            }
            break



            case prefix + 'tebakgambar':
                if (isGame(sender, isOwner, gcount, glimit)) return sendRespon('limit')
                if (isGroup) return reply('Permainan hanya bsia di lakukan di private chat')
                reply('memulai permainan')
                if (isPlayGame(from, tebakgambar)) return bob.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
                games.tebakgambar().then(data => {
                    data = data[0]
                    data.jawaban = data.jawaban.split('Jawaban ').join('')
                    var teks = `*TEBAK GAMBAR*\n\nPetunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`
                    bob.sendMessage(from, {
                            image: {
                                url: data.image
                            },
                            caption: teks
                        }, {
                            quoted: msg
                        })
                        .then(res => {
                            var jawab = data.jawaban.toLowerCase()
                            addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
                            gameAdd(sender, glimit)
                        })
                })
                break




            //belim jadi
             case prefix + 'kodekeras': {
                if (!q) return reply('mau versi cwe apa cwo?')
                var typex = q
                reply('Sayang bisa jalan gk?')
                await sleep(3000)
                const sections = [{
                        title: "Pilihan 1 Terima",
                        rows: [{
                            title: "Ayo sayang",
                            rowId: `${prefix}jawab terima`
                        }]
                    },
                    {
                        title: "Pilihan 2 Tolak",
                        rows: [{
                                title: "Gak ah males",
                                rowId: `${prefix}jawab tolak`
                            }
                            //{title: "Option 4", rowId: "option4", description: "This is a description V2"}
                        ]
                    },
                ]

                const listMessage = {
                    text: "Pilih jawaban ",
                    footer: "Beta version kodekeras",
                    title: "-",
                    buttonText: "-",
                    sections
                }
                const sendMsg = await bob.sendMessage(M.chat, listMessage)
            }
            break

            case prefix + 'jawab':
                if (!q) return console.log('kok kosong?')
                var jwb = q
                if (jwb == 'terima') {
                    bob.sendMessage(M.chat, {
                        text: 'Mau jalan ke mana ayang👀😘'
                    })
                } else if (jwb == 'tolak') {
                    bob.sendMessage(M.chat, {
                        text: 'Kok kamu gtu sih😠'
                    })
                }
                break

            case prefix + 'setcmd': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                global.db.data.cmd = global.db.data.cmd || {}
                if (!M.quoted) return reply(`Reply stiker!!\nExample : ${prefix + command} menu\n\n\n*Note : Tidak dapat disertai Prefix!!*`)
                if (!M.quoted.fileSha256) return reply('SHA256 Hash Missing')
                if (!q) return reply(`Untuk Command Apa?`)
                let sticker = global.db.data.cmd
                let hash = M.quoted.fileSha256.toString('base64')
                if (sticker[hash] && sticker[hash].locked) return reply('You have no permission to change this sticker command')
                sticker[hash] = {
                    q,
                    mentionedJid: M.mentionedJid,
                    creator: M.sender,
                    at: +new Date,
                    locked: false,
                }
                reply(`Done!`)
                limitAdd(sender, limit)
            }
            break

            case prefix + 'delcmd': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let hash = M.quoted.fileSha256.toString('base64')
                if (!hash) return reply(`Tidak ada hash`)
                let sticker = global.db.data.cmd
                if (sticker[hash] && sticker[hash].locked) return reply('You have no permission to delete this sticker command')
                delete sticker[hash]
                reply(`Done!`)
            }
            break

            case prefix + 'listcmd': {
                let teks = `
*List Hash*
Info: *bold* hash is Locked

*Hash :*
 ${Object.entries(global.db.data.cmd).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} 
*Command: ${value.q}*
*Creator : @${value.creator.split("@")[0]}*
*Create Time : ${clockString(new Date - value.at)} ago*
*Locked : ${value.locked}*

`).join('\n')}
`.trim()
                replyNtag(teks)
                limitAdd(sender, limit)
            }
            break

            case prefix + 'lockcmd': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                if (!isOwner) return reply('Only Onwer..')
                if (!M.quoted) return reply('Reply Pesan!')
                if (!M.quoted.fileSha256) return reply('SHA256 Hash Missing')
                let sticker = global.db.data.cmd
                let hash = M.quoted.fileSha256.toString('base64')
                if (!(hash in sticker)) return reply('Hash not found in database')
                sticker[hash].locked = !/^un/i.test(command)
                limitAdd(sender, limit)
                M.reply('Done!')
            }
            break

            case prefix + 'afk': {
                let user = global.db.data.users[M.sender]
                user.afkTime = +new Date
                let text = q ? q : 'Tidak Ada!'
                user.afkReason = text
                replyNtag(`@${M.sender.split("@")[0]} Telah Afk dengan alasan ${text}`)
            }
            break


            case prefix + 'menu':
            case prefix + 'help':
            case 'bob': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                bob.sendMessage(from, {
                    react: {
                        text: "⏱️",
                        key: msg.key
                    }
                })
                const more = String.fromCharCode(8206)
                const readmore = more.repeat(4001)

                function toCommas(x) {
                    x = x.toString()
                    var pattern = /(-?\d+)(\d{3})/;
                    while (pattern.test(x))
                        x = x.replace(pattern, "$1,$2");
                    return x;
                }

                var buttons = [{
                    buttonId: `${prefix}owner`,
                    buttonText: {
                        displayText: 'owner'
                    },
                    type: 1
                }]
                var buttonMessage = {
                    document: global.pathImg,
                    fileName: `Selamat ${salam}👋`,
                    mimetype: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
                    fileLength: "0",
                    pageCount: "2022",
                    caption: help.listMenu(listmenu, M, sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount),
                    mentions: [sender],
                    footer: `⛽Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}\n📬Limit Harian : ${isOwner ? '∞' : isPremium ? '∞' : getLimit(sender, limitCount, limit)}\n💰Balance : $${toCommas(getBalance(sender, balance))}`,
                    buttons: buttons,
                    headerType: 3,
                    contextInfo: {
                        "externalAdReply": {
                            "mentionedJid": sender,
                            "title": global.botName,
                            "mediaType": 1,
                            "renderLargerThumbnail": true,
                            "showAdAttribution": true,
                            "jpegThumbnail": global.pathImg,
                            "mediaUrl": 'youtube.com/c/febzabotz',
                            "thumbnail": global.pathImg,
                            "thumbnailUrl": 'https://a.uguu.se/OPOuUHt.png',
                            "sourceUrl": 'youtube.com/c/febzabotz',
                        }
                    }
                }
                bob.sendMessage(from, buttonMessage, {
                    quoted: global.fpoll
                })
            }
            break


            case prefix + 'sc':
            case prefix + 'script': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                reply(`Minta ke ${global.ownerName} :D`)
                console.log(chalk.rgb(0, 250, 154).underline('Bang ' + global.ownerName + ' ada yang minta sc!!'));
            }
            break

            case prefix + 'owner':
            case prefix + 'creator':
                let vcard = 'BEGIN:VCARD\n' +
                    'VERSION:3.0\n' +
                    'N:;PBZ463.;;;' +
                    'FN:PBZ463.\n' +
                    'ORG:Owner Bot;\n' +
                    'item1.TEL;type=CELL;type=VOICE;waid=6285849261085:+62 858-4926-1085\n' +
                    'item1.X-ABLabel:Creator bot\n' +
                    'item2.EMAIL;type=INTERNET:@gmail.com\n' +
                    'item2.X-ABLabel:Email\n' +
                    'item3.URL:https://\n' +
                    'item3.X-ABLabel:Instagram\n' +
                    'item4.ADR:;;Indonesia;;;;\n' +
                    'item4.X-ABLabel:Region\n' +
                    'END:VCARD'
                bob.sendMessage(from, {
                    contacts: {
                        displayName: 'Owner Bot',
                        contacts: [{
                            vcard
                        }]
                    }
                }, {
                    quoted: msg
                })
                break

            case 'del':
            case prefix + 'del':
            case prefix + 'delete':
            case prefix + 'd': {
                if (!M.quoted.isBaileys) return reply('Pesan tersebut bukan dikirim oleh bot!')
                bob.sendMessage(M.chat, {
                    delete: {
                        remoteJid: M.chat,
                        fromMe: true,
                        id: M.quoted.id,
                        participant: M.quoted.sender
                    }
                })
            }
            break

            /*case'menu': case'bob':
            			case'help': {								
                          bob.sendMessage(from, { react: { text: "⏱️", key: msg.key }})       			
            				bob.sendMessage(from, {
            				   image: { url: 'https://i.ibb.co/Hg1Ltr3/boby.jpg' },
            				   caption: `📍Masi Tahap Pengembangan👀🏁`,
            				   buttons: [{buttonId: `${prefix}donasi`, buttonText: { displayText: "Donasi" }, type: 1 },
            					{buttonId: `${prefix}sc`, buttonText: { displayText: "Source Code" }, type: 1 }],
            				   footer: help.listMenu(prefix, listmenu, M)
            			      }, { quoted: nay1 })
            			      }			       				                     
            				break*/

            case prefix + 'donasi':
            case prefix + 'donate':
                reply('GOPAY & DANA & OVO & LinkAja : 085849261085')
                break


            case prefix + 'join':
            case prefix + 'joingc': {
                if (!isOwner) return reply(mess.owner)
                if (!q) return reply(mess.link)
                if (!isUrl(q)) return reply(mess.link)
                if (!q.includes('chat.whatsapp.com')) return reply("Link Invalid")
                let query = q.split('https://chat.whatsapp.com/')[1]
                let data = await bob.groupAcceptInvite(query)
                await reply(jsonformat(data))
            }
            break


            case prefix + 'setpp':
            case prefix + 'setppbot':
                if (!isOwner) return reply(mess.owner)
                if (isImage || isQuotedImage) {
                    let img = await bob.downloadAndSaveMediaMessage(quoted)
                    await bob.updateProfilePicture(botNumber, {
                        url: img
                    }).then(res => fs.unlinkSync(img))
                    await reply('Done..')
                } else {
                    reply('Reply Img nya')
                }
                break

                //Group Sistem
            case prefix + 'revoke':
                if (!isGroup) return reply(mess.group)
                if (!isGroupAdmins) return reply(mess.admin)
                if (!isBotGroupAdmins) return reply(mess.botAdmin)
                let link = await bob.groupRevokeInvite(from)
                await reply('Done' + `\n\n*New Link for ${groupName}* :\n https://chat.whatsapp.com/${link}`)
                break

            case prefix + 'leave':
                if (!isGroup) return reply(mess.group)
                if (!isGroupAdmins && !isOwner) return reply(mess.admin)
                reply('Sayonara~ 👋').then(async res => await bob.groupLeave(from))
                break

            case prefix + 'tagall':
            case prefix + 'infoall':
                if (!isGroup) return reply(mess.group)
                if (!isGroupAdmins && !isOwner) return reply(mess.admin)
                let teks = `*Mention All\n*Message :  ${q ? q : 'Nothing'}*\n\n`
                for (let mem of groupMembers) {
                    teks += `࿃➡️ @${mem.id.split('@')[0]}\n`
                }
                teks += `\n*${botName}*`
                bob.sendMessage(from, {
                    text: teks,
                    mentions: groupMembers.map(a => a.id)
                }, {
                    quoted: msg
                })
                break

            case prefix + 'hidetag':
                if (!isGroup) return reply(mess.group)
                if (!isGroupAdmins && !isOwner) return reply(mess.admin)
                bob.sendMessage(from, {
                    text: q ? q : '',
                    mentions: groupMembers.map(a => a.id)
                })
                break

                /* *********************************************************/

            case prefix + 'sendbuffer':
                if (!isOwner) return
                try {
                    await reply('Tunggu sebentar...')
                    sendFile(M.chat, isUrl(q)[0], '', M)
                } catch (err) {
                    await reply(err)
                    console.log(err)
                }
                break

                /* *********************************************************/

            case prefix + 'ping':
            case prefix + 'speed': {
                const timestamp = speed();
                const latensi = speed() - timestamp
                const neww = performance.now()
                const oldd = performance.now()
                reply(`
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_

${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`)

            }
            break

            case prefix + 'runtime': {
                reply(`${runtime(run)}`)
            }
            break

            case prefix + 'tomp4':
            case prefix + 'tovideo': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                if (!/webp/.test(mime)) return reply(`balas stiker dengan caption *${prefix + command}*`)
                let media = await bob.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await bob.sendMessage(M.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Convert Webp To Video'
                    }
                }, {
                    quoted: msg
                })
                await fs.unlinkSync(media)
                limitAdd(sender, limit)
            }
            break

            case prefix + 'togif': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                if (!/webp/.test(mime)) return reply(`balas stiker dengan caption *${prefix + command}*`)
                let media = await bob.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await bob.sendMessage(M.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Convert Webp To Video'
                    },
                    gifPlayback: true
                }, {
                    quoted: msg
                })
                await fs.unlinkSync(media)
                limitAdd(sender, limit)
            }
            break

            case prefix + 'take':
            case prefix + 'colong':
            case prefix + 'swm':
            case prefix + 'stickerwm':
            case prefix + 'wm':
            case prefix + 'exif': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                if (!quoted) return reply(`Reply Media dengan caption ${prefix + command} Punya|Saya`)
                try {
                    let media = await quoted.download()
                    let encmedia = await bob.sendImageAsSticker(M.chat, media, M, {
                        packname: q.split("|")[0] ? q.split("|")[0] : global.packname,
                        author: q.split("|")[1] ? q.split("|")[1] : global.author
                    })
                    sleep(3000)
                    await fs.unlinkSync(encmedia)
                } catch (e) {
                    console.log(e)
                    reply('「 ❗ 」only sticker image')
                }
                limitAdd(sender, limit)
            }
            break


                /*=========== akianator */


            case prefix + 'akinator': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                if (fs.existsSync('./data_load/' + from + '.json')) return msg.reply(`Masih ada game akinator yg berlangsung\nketik .cencelakinator untuk menghapus game`)
                setTimeout(async () => {
                    await msg.reply("Game akan segera dimulai\nPikirkan 1 tokoh terkenal\nAku akan menebaknya")
                }, 1000)
                akinator[msg.sender] = new Aki({
                    region: "id",
                    childMode: false
                })
                await akinator[msg.sender].start()
                let sesi = [msg.sender]
                fs.writeFileSync(`./data_load/${from}.json`, JSON.stringify(sesi, null, 2))
                var mss = (`*Progress: ${akinator[msg.sender].progress.toFixed(2)}%*\n\nPertanyaan : ${akinator[msg.sender].question}\n\n1. Iya\n2. Tidak\n3. Tidak tahu\n4. Mungkin\n5. Mungkin tidak\n6. Kembali\nKetik #cancelakinator untuk membatalkan game \n`)
                const buttons = [{
                    buttonId: `${prefix}cencelakinator`,
                    buttonText: {
                        displayText: 'Berhenti Bermain'
                    },
                    type: 1
                }]
                const buttonMessage = {
                    text: mss,
                    footerText: 'Hello Owner',
                    buttons: buttons,
                    headerType: 1
                }
                bob.sendMessage(M.chat, buttonMessage)
            }
            break

            case prefix + 'cencelakinator':
            case prefix + 'delsesiakinator': {
                if (!fs.existsSync('./data_load/' + from + '.json')) return msg.reply(`Tidak ada sesi yang bisa dihapus disini!`)
                delete akinator[msg.sender]
                fs.unlinkSync('./data_load/' + from + '.json')
                msg.reply('Anda mengakhiri permainan')
            }
            break


            /**************** NO PLUGINS ***************/


            case prefix + 'absen':
                global.db.data.absen = global.db.data.absen || {}
                if (!(from in global.db.data.absen)) return reply(`Tidak ada absen berlangsung!`)
                let absen = global.db.data.absen[from][1]
                const wasVote = absen.includes(M.sender)
                if (wasVote) return reply('Kamu sudah absen!')
                absen.push(M.sender)
                let d = new Date
                let date = d.toLocaleDateString('id', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })
                let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
                let caption = `Tanggal: ${date}

${global.db.data.absen[from][2] ? global.db.data.absen[from][2] + '\n' : ''}
╭─「 Daftar Absen 」
│ Total: ${absen.length}
${list}
╰────`.trim()
                await replyNtag(caption)
                //bob.sendMessage(from,{text : caption},{quoted:msg})
                break


            case prefix + 'cekabsen':
                global.db.data.absen = global.db.data.absen || {}
                if (!(from in global.db.data.absen)) return reply(`Tidak ada absen berlangsung!`)
                let dd = new Date
                let datee = dd.toLocaleDateString('id', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })
                let absenn = global.db.data.absen[from][1]
                let listt = absenn.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
                let captionn = `Tanggal: ${datee}
${global.db.data.absen[from][2] ? global.db.data.absen[from][2] + '\n' : ''}
╭─「 Daftar Absen 」
│ Total: ${absenn.length}
${listt}
╰────`.trim()
                replyNtag(captionn)
                break

            case prefix + 'deleteabsen':
            case prefix + 'delabsen':
                if (M.isGroup) {
                    if (!(isGroupAdmins || isOwner)) return reply('Only Admin')
                }
                global.db.data.absen = global.db.data.absen || {}
                if (!(from in global.db.data.absen)) return reply(`Tidak ada absen berlangsung!`)
                delete global.db.data.absen[from]
                M.reply(`Absen berhasil dihapus`)
                break


            case prefix + 'absenstart':
                if (!q) return reply('Absennya apa?')
                if (M.isGroup) {
                    if (!(isGroupAdmins || isOwner)) return reply('Only Admin')
                }
                global.db.data.absen = global.db.data.absen || {}
                if (from in global.db.data.absen) return reply(`Masih ada absen di chat ini!`)
                global.db.data.absen[from] = [
                    await bob.sendMessage(from, {
                        text: 'Absen Di Mulai..'
                    }, {
                        quoted: msg
                    }),
                    [],
                    q
                ]
                break



                /**************** PLUGINS ***************/



                //----> OtakuDesu 

            case prefix + 'otakudesu':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let ket = q.split("|")[0]
                let quer = q.split("|")[1]
                if (!ket) return reply('「 ❗ 」masukan paramater!!\n\nexample : #otakudesu search|')
                if (ket == "search") {
                    let otakudesu_search = require('../plugins/otaku_search');
                    otakudesu_search(M, quer, prefix, msg, fpoll, mSpace, bob)
                }
                if (ket == "get") {
                    let otakudesu_eps = require('../plugins/otaku_eps');
                    otakudesu_eps(M, quer, prefix, msg, mSpace, bob)
                }
                if (ket == "download") {
                    let otakudesu_download = require('../plugins/otaku_download');
                    otakudesu_download(M, quer, prefix, msg, mSpace, bob)
                }
                break


                //----> End Of OtakuDesu


                //-----> 「 ❗ 」SEARCHING
            case prefix + 'pin':
            case prefix + 'pinte':
            case prefix + 'pinterest':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let pinte = require('../plugins/pinterest');
                pinte(M, q, prefix, msg, bob)
                limitAdd(sender, limit)
                break

            case prefix + 'lirik':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let lirik = require('../plugins/lirik')
                lirik(q, sendFile, M, textImg, sendMess)
                limitAdd(sender, limit)
                break

            case prefix + 'ghstalk':
            case prefix + 'ghsearch':
            case prefix + 'githubstalk':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let github = require('../plugins/github')
                github(q, textImg, sendMess)
                limitAdd(sender, limit)
                break

            case prefix + 'suit':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let suit = require('../plugins/suit')
                suit(q, reply, prefix)
                limitAdd(sender, limit)
                break


                //-----> 「 ❗ 」END SEARCHING 
            case prefix + 'calc':
            case prefix + 'kalkulator':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let calc = require('../plugins/calculator')
                calc(M, bob, q)
                limitAdd(sender, limit)
                break

            case prefix + 'namaninja':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let namaninja = require('../plugins/namaninja')
                namaninja(q, M)
                limitAdd(sender, limit)
                break

            case prefix + 'alay':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let alay = require('../plugins/alay')
                alay(M, q)
                limitAdd(sender, limit)
                break

            case prefix + 'group':
            case prefix + 'grup':
                if (!isGroup) return reply(mess.group)
                if (!isGroupAdmins && !isOwner) return reply(mess.admin)
                let groupsettings = require('../plugins/groupSettings')
                groupsettings(q, bob, M)
                break


            case prefix + 's':
            case prefix + 'sticker':
            case prefix + 'stiker':
                let stickers = require('../plugins/sticker')
                stickers(textImg, quoted, mime, bob, M)
                break

            case prefix + 'mode':
            case prefix + 'set':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                if (!isOwner) return reply(mess.owner)
                let mode = require('../plugins/mode')
                mode(prefix, bob, M)
                limitAdd(sender, limit)
                break


            case prefix + 'self': {
                if (!isOwner) return reply(mess.owner)
                global.Mode = 'Self'
                reply('Done..')
            }
            break

            case prefix + 'public': {
                if (!isOwner) return reply(mess.owner)
                global.Mode = 'Public'
                reply('Done..')
            }
            break

            case prefix + 'toimg':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let toimg = require('../plugins/toimg')
                toimg(bob, M, quoted, isQuotedSticker, textImg)
                limitAdd(sender, limit)
                break

            case prefix + 'broadcast':
            case prefix + 'bcgc':
                let bcgc = require('../plugins/broadcast')
                bcgc(M, q, bob, isOwner)
                break

                //----> Downloader 
            case prefix + 'ytstalk':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let ytstalk = require('../plugins/ytstalk')
                ytstalk(M, sendFile, q, bob)
                limitAdd(sender, limit)
                break

            case prefix + 'yts':
            case prefix + 'ytsearch':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let ytsearch = require('../plugins/yts')
                ytsearch(M, reply, q, sendFile, prefix, bob)
                limitAdd(sender, limit)
                break

            case prefix + 'ytv':
            case prefix + 'ytvideo':
            case prefix + 'ytmp4':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let ytvideo = require('../plugins/ytv')
                ytvideo(M, reply, q, bobSend, prefix, msg, bob)
                limitAdd(sender, limit)
                break

            case prefix + 'yta':
            case prefix + 'ytaudio':
            case prefix + 'ytmp3':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let ytaudio = require('../plugins/yta')
                ytaudio(M, reply, q, bobSend, prefix, msg, bob)
                limitAdd(sender, limit)
                break
                     
            case prefix + 'tiktok':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let tag = q.split("|")[0]
                let dat = q.split("|")[1]
                let ttvid = require('../plugins/tiktokvid')
                ttvid(M, q, msg, tag, dat, bob)
                limitAdd(sender, limit)
                }
                break

            case prefix + 'zippy':
            case prefix + 'zippyshare':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let zippy = require('../plugins/ZippyShare');
                zippy(M, q, msg, sendFile, bob)
                limitAdd(sender, limit)
                break

                //----> End


                //----> Converter <----\\

            case prefix + 'telegramph':
            case prefix + 'tourl':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let teleph = require('../plugins/telegram_ph.js')
                teleph(M, prefix, quoted, mime, msg, bob)
                limitAdd(sender, limit)
                break

            case prefix + 'UploadFileUgu':
            case prefix + 'tourl2': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let teleph = require('../plugins/UploadFileUgu.js')
                teleph(M, prefix, quoted, mime, msg, bob)
            }
            limitAdd(sender, limit)
            break

            case prefix + 'texttoqr':
            case prefix + 'qrgen':
            case prefix + 'qrgenerator':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let QRgen = require('../plugins/QRgenerate.js')
                QRgen(M, q, bob)
                limitAdd(sender, limit)
                break

            case prefix + 'qrcodereader':
            case prefix + 'qrreader':
            case prefix + 'readqr':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let QRread = require('../plugins/QRreader');
                QRread(M, quoted, mime, msg, bob)
                limitAdd(sender, limit)
                break

                //----> End <----\\

                //----> Searching Anime <----\\

            case prefix + 'kusonime':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let kuso = require('../plugins/kusonime.js')
                kuso(M, q, msg, reply, bob)
                limitAdd(sender, limit)
                break
            case prefix + 'batchkusonime':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let kuso_batch = require('../plugins/kuso_batch.js')
                kuso_batch(M, q, prefix, msg, bob)
                limitAdd(sender, limit)
                break
            case prefix + 'what':
            case prefix + 'whatanime':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return sendLimit()
                let what = require('../plugins/what_anime')
                what(quoted, mime, bob, msg, M)
                limitAdd(sender, limit)
                break

                //----> End <----\\

                //----> Limited & Balance <----\\

            case prefix + 'topbalance': {
                function mentions(teks, mems = [], id) {
                    if (id == null || id == undefined || id == false) {
                        let res = bob.sendMessage(from, {
                            text: teks,
                            mentions: mems
                        })
                        return res
                    } else {
                        let res = bob.sendMessage(from, {
                            text: teks,
                            mentions: mems
                        }, {
                            quoted: msg
                        })
                        return res
                    }
                }
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOP BALANCE 」 ──*\n\n'
                let arrTop = []
                var total = 10
                if (balance.length < 10) total = balance.length
                for (let i = 0; i < total; i++) {
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
            break
            case prefix + 'limit':
            case prefix + 'balance':
            case prefix + 'ceklimit':
            case prefix + 'cekbalance':
                if (isOwner) return reply('lu owner goblok')

                var Ystatus = ownerNumber.includes(sender)
                var isPrim = Ystatus ? true : _prem.checkPremiumUser(sender, premium)
                var ggcount = isPrim ? gcounti.prem : gcounti.user
                var limitMen = `${getLimit(sender, limitCount, limit)}`
                reply(`Limit : ${_prem.checkPremiumUser(sender, premium) ? 'Unlimited' : limitMen}/${limitCount}\nLimit Game : ${cekGLimit(sender, ggcount, glimit)}/${ggcount}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                break

            case prefix + 'buylimit': {
                if (isOwner) return reply('lu owner bang')
                if (!q) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                let ane = q * 150
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, q, limit)
                reply(`Pembeliaan limit sebanyak ${q} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`)
            }
            break

            case prefix + 'transfer': //bug!!
            case prefix + 'tf': {
                let mentionx = q.split("|")[0]
                let jumlah = q.split("|")[1]
                if (args.length < 1) return reply(`Kirim perintah *${command}* @tag|nominal\nContoh : ${command} @0|2000`)
                if (!jumlah) return reply('masukan nominal')
                if (isNaN(jumlah)) return reply('hanya berupa angka')
                var cut = mentionx.replace('@', '')
                var rees = cut + '@s.whatsapp.net'
                var anu = getBalance(sender, balance)
                if (anu < jumlah) return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${jumlah}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                kurangBalance(sender, jumlah, balance)
                addBalance(rees, jumlah, balance)
                replyNtag(`Sukses transfer balance sebesar $${jumlah} kepada ${mentionx}`)
            }
            break

            //----> End <----\\

            case prefix + 'smeme':
                let smeme = require('../plugins/smeme')
                smeme(M, bob, sendFile, q)
                break;

            case prefix + 'smemelower':
                let smemelower = require('../plugins/smemelower')
                smemelower(M, bob, sendFile, q)
                break;

               

            default:
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update ${__filename}`)
    delete require.cache[file]
    require(file)
})