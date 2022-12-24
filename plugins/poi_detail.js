const { Search, getRecent, list, getId } = require("nekopoi-scraper");

const neko_detail = async (M, q, msg, bob) => {
try { 

       if (!q) return M.reply('ID?')
       var neko = await getId(q)             
        var result = `Title: ${neko.title}\nJapanes: ${neko.info_meta.aliases || 'Tidak tersedia'}\nStatus: ${neko.info_meta.status}\nTayang: ${neko.info_meta.tayang}\nProduser: ${neko.info_meta.produser}\nRate: ${neko.info_meta.skor}\nDurasi: ${neko.info_meta.durasi}\n\nDeskripsi: ${neko.description}`
        var list = []            
		var teskd = `List Download Per Episode`
		for (let i of neko.episode) {
		list.push({
		title: i.title, rowId: '#download_neko ' + i.id, description: 'ID: ' + i.id + ' Date: ' + i.date
		})
		}
		
		var sections = [{title: 'NekoPoi [ Only Devoloper ]',rows:list}]
				
		const Lm = { text: result, footer: "NekoPoi🐈", buttonText: "Click Here", sections }
		
		bob.sendMessage(M.chat, Lm, {quoted:msg})

} catch (e) { 
  
        var neko = await getId(q)        
        console.log(neko.download) 
        var result = `Title: ${neko.title}\n\n`          	
		for (let i of neko.download) {			
		result += `Type: ${i.type}\n`
	    result += `${i.links[0].name + ': ' + i.links[0].link || tidak_tersedia}\n`
	    result += `${i.links[1].name + ': ' + i.links[1].link || tidak_tersedia}\n`
	    result += `${i.links[2].name + ': ' + i.links[2].link || tidak_tersedia}\n`
	    result += `${i.links[3].name + ': ' + i.links[3].link || tidak_tersedia}\n`
	    result += `${i.links[4].name + ': ' + i.links[4].link || tidak_tersedia}\n`
	    result += `${i.links[5].name + ': ' + i.links[5].link || tidak_tersedia}\n`
	    result += `${i.links[6].name + ': ' + i.links[6].link || tidak_tersedia}\n\n`	   
		}	
			
		bob.sendMessage(M.chat, {text: result}, {quoted:msg})

}
}
module.exports = neko_detail