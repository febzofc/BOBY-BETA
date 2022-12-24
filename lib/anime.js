const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require('axios')
const qs = require('qs')
const request = require('request');
const randomarray = async (array) => {
	return array[Math.floor(Math.random() * array.length)]
}

exports.chara = async(query) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.anime-planet.com/characters/all?name=${query}&sort=likes&order=desc`)
    .then((data) => {
      const $ = cheerio.load(data.data)
      const linkp = $('#siteContainer > table > tbody > tr:nth-child(1) > td.tableCharInfo > a').attr('href')
      axios.get('https://www.anime-planet.com' + linkp)
      .then((data) => {
        //console.log(data.data)
        const $$ = cheerio.load(data.data)
      resolve({
        nama: $$('#siteContainer > h1').text(),
        gender: $$('#siteContainer > section.pure-g.entryBar > div:nth-child(1)').text().split('\nGender: ')[1],
        warna_rambut: $$('#siteContainer > section.pure-g.entryBar > div:nth-child(2)').text().split('\nHair Color: ')[1],
        warna_mata: $$('#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(1) > div').text().split('\n')[1],
        gol_darah: $$('#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(2) > div').text().split('\n')[1],
        birthday: $$('#siteContainer > section:nth-child(11) > div > div > div > div > div:nth-child(3) > div').text().split('\n')[1],
        description: $$('#siteContainer > section:nth-child(11) > div > div > div > div:nth-child(1) > p').text()
      })
    })
    })
    .catch(reject)
  })
}

exports.chara2 = async(query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://www.wallpaperflare.com/search?wallpaper='+ query,{
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const result = [];
			$('#gallery > li > figure > a').each(function(a, b) {
				result.push($(b).find('img').attr('data-src'))
			})
			resolve(result)
		})
	.catch({status: 'err'})
	})
}

exports.anime = async(query) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.anime-planet.com/anime/all?name=${query}`)
    .then((data) => {
      const $ = cheerio.load(data.data)
      const result = [];
      const judul = [];
      const link = [];
      const thumb = [];
      $('#siteContainer > ul.cardDeck.cardGrid > li > a > h3').each(function(a, b) {
        deta = $(b).text();
        judul.push(deta)
      })
      $('#siteContainer > ul.cardDeck.cardGrid > li > a').each(function(a, b) {
        link.push('https://www.anime-planet.com' + $(b).attr('href'))
      })
      $('#siteContainer > ul.cardDeck.cardGrid > li > a > div.crop > img').each(function(a, b) {
        thumb.push('' + $(b).attr('src'))
      })
      for(let i=0; i<judul.length; i++){
        result.push({
          judul: judul[i],
          thumb: thumb[i],
          link: link[i]
        })
      }
      resolve(result)
    })
    .catch(reject)
  })
}

exports.pinterest = async(querry) => {
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift();
		resolve(hasil)
		})
	})
}