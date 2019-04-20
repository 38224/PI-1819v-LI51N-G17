'use strict'

const request = require('request')

class YamaDb {
	
	constructor(es) { 
		this.uri = `http://${es.host}:${es.port}/${es.index}`
	} // localhost:9200/yama
	
	static init(es) {
		return new YamaDb(es)
	}
	createPlaylist(playlist,cb) {  // cria grupo com {_id:xxx,name:nome,description:desc,musics:[]}
		playlist.musics = []
		request.post(
			{
				uri:`${this.uri}/playlist`,
				headers: { 'content-type' : 'application/json' },
				json: true,
				body: playlist
			}, 
            (err, res, body) => { 
				handleResponse(err, res, 201, { 'status': 'created', '_id': body._id }, cb)
			}
		)
    }
	getPlaylists(cb) {
		request.get(
			{
				uri:`${this.uri}/playlist/_search`,
				headers: { 'content-type' : 'application/json' },
				json: true
			},
			(err, res, body) => {
				console.log(body.hits.hits[0]._source)
        		handleResponse(err, res, 200, body.hits.hits.map( p => parsePlaylists(p)), cb)
        	}
		)
		//http://localhost:9200/yama/playlist/_search
    }
}
function parsePlaylists(playlist) {
    let res = {
        '_id': playlist._id,
        "name": playlist._source.name,
		"description": playlist._source.description,
        "musics": playlist._source.musics, 
    }
    return res
} 
function handleResponse(err, res, expectedStatusCode, body, cb, message){
    if(err)
        return cb(err, null) 
    switch(res.statusCode){
        case expectedStatusCode: 
            cb(null, body); break
        case 404: 
            cb({ 'code': res.statusCode, 'message': 'Group does not exist' }, null); break
        default: 
            cb({ 'code': res.statusCode, 'message': message }, null); break
    }
}
 
module.exports = YamaDb