'use strict'

const request = require('request')
class LastFm {
	 
	constructor(api_info) {
		this.API_KEY = api_info.API_KEY
		this.yama_api = api_info.yama_api
	}
	
	static init(api_info) {
		return new LastFm(api_info)
	}
	
	getArtistsByName(name,cb) { 
		get(cb,
			{
				uri: `${this.yama_api}?method=artist.search&artist=${name}&api_key=${this.API_KEY}&format=json`,
				json: true
			},
			(body) => {
				if(body.errorCode == 400)
					return {'code': 400, 'message': 'invalid artist' }
				if(body.error == 404)
					return {'code': 404, 'message': 'artist does not exist' }
			},
			(body) => body.results.artistmatches.artist.map(a => parseArtists(a)))
	}
}
function parseArtists(artist) {
    let res = {
        'name': artist.name,
        "listeners": artist.listeners,
        "mbid": artist.mbid,
        "url": artist.url
		//nao interessa as imagens?
    }
    return res
}

function get(cb, options, checkResponse, getBody) {
    request.get(
        options, 
        (err, res, body) => {
            if(err)
                return cb(err)
            let error
            if((error = checkResponse(body)))
                return cb(error, null)

            res.statusCode == 200 ?
            cb(null, getBody(body))
                : cb({'code': body.errorCode, 'message': body.message }, null)
        }
    )
}
 
module.exports = LastFm
	 
 