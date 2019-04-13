
const lastFmData = require('./data/lastfm-data')
const yamaDb = require('./data/yama-db')


	let name = req.params.name 
	const uri = `${es.yama_api}?method=artist.search&artist=${name}&api_key=${es.Api_token}&format=json`  // necessita criar variável com url do site em vez de hardcoded
		request.get(uri, (err, res, body) =>{
			res.statusCode = statusCode
			res.end(JSON.stringify(data))
		})