const fs = require('fs')
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")


exports.listMenu = ( listmenu, M, sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount ) => {
var Media = ""
var Owner = ""
var Group = ""
var Download = ""
var Random = ""
var Stalk = "" 
var Game = ""
var Usr = ""
var Anime = ""
var Gen = ""
var Search = ""
var number = 0


Object.keys(listmenu.media).forEach((i) => {number++
Media += `\n  ≻ *${prefix}` + listmenu.media[i] + "*"})

Object.keys(listmenu.owner).forEach((i) => {number++
Owner += `\n  ≻ *${prefix}` + listmenu.owner[i] + "*"})

Object.keys(listmenu.group).forEach((i) => {number++
Group += `\n  ≻ *${prefix}` + listmenu.group[i] + "*"})

Object.keys(listmenu.random).forEach((i) => {number++
Random += `\n  ≻ *${prefix}` + listmenu.random[i] + "*"})

Object.keys(listmenu.stalker).forEach((i) => {number++
Stalk += `\n  ≻ *${prefix}` + listmenu.stalker[i] + "*"})

Object.keys(listmenu.download).forEach((i) => {number++
Download += `\n  ≻ *${prefix}` + listmenu.download[i] + "*"})

Object.keys(listmenu.user_data).forEach((i) => {number++
Usr += `\n  ≻ *${prefix}` + listmenu.user_data[i] + "*"})

Object.keys(listmenu.anime).forEach((i) => {number++
Anime += `\n  ≻ *${prefix}` + listmenu.anime[i] + "*"})

Object.keys(listmenu.generator).forEach((i) => {number++
Gen += `\n  ≻ *${prefix}` + listmenu.generator[i] + "*"})

Object.keys(listmenu.game).forEach((i) => {number++
Game += `\n  ≻ *${prefix}` + listmenu.game[i] + "*"})

Object.keys(listmenu.searching).forEach((i) => {number++
Search += `\n  ≻ *${prefix}` + listmenu.searching[i] + "*"})

return `Kategori User : ${Usr}

Kategori Anime : ${Anime}

Kategori Searching : ${Search}

Kategori Converter :  ${Media}

Kategori Random :  ${Random}

Kategori Stalk :  ${Stalk}

Kategori Download :  ${Download}

Kategori Group :  ${Group}

Kategori Owner :  ${Owner}

Kategori Game : ${Game}

Kategori Generator : ${Gen}
`
}