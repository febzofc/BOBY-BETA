const { Search, getRecent, list, getId } = require("nekopoi-scraper");

const neko_search = async (M, q, msg, bob) => {
try {
if (!q) return M.reply('query') 
    
      var neko = await Search(q)
      console.log(neko)
      
        var result = 'result from ' + q
      
       // var result = `「 ❗ 」status: 200 result :\n\njudul : ${res.info.judul}\n\nrilis : ${res.info.tanggal_rilis}\n\nsinopsis : ${res.sinopsis}`
       
        var list = []            
		var teskd = `List Download Per Episode`
		for (let i of neko) {
		list.push({
		title: i.title, rowId: '#neko_get ' + i.id, description: 'ID: ' + i.id + ' Date: ' + i.date
		})
		}
		var sections = [{title: 'NekoPoi [ Only Devoloper ]',rows:list}]
				
		const Lm = { text: result, footer: "NekoPoi🐈", buttonText: "Click Here", sections }
		
		bob.sendMessage(M.chat, Lm, {quoted:msg})	
		
		//loop
			
		
		

} catch (e) {
   M.reply('errro\n\n' + e)
}
}
module.exports = neko_search