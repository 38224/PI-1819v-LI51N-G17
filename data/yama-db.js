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
		playlist.duration = 0
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
	editPlaylist(playlistId,body,cb) {  // edita grupo com {_id:xxx,name:nome,description:desc,musics:[]}
		request.put(
		{
				uri:`${this.uri}/playlist/${playlistId}`,  
				body: body,
				json: true
			},
			(err, res, body) => {
				handleResponse(err, res, 200, { 'status': 'updated' }, cb)
		}) 
	}
	getPlaylists(cb) {
		request.get(
			{
				uri:`${this.uri}/playlist/_search`,
				headers: { 'content-type' : 'application/json' },
				json: true
			},
			(err, res, body) => {
        		handleResponse(err, res, 200, body.hits.hits.map( p => parsePlaylists(p)), cb)
        	}
		)
		//http://localhost:9200/yama/playlist/_search
    }
	getPlaylistInfo(mbid,cb) {
		request.get(
			{
				uri:`${this.uri}/playlist/${mbid}`,
				headers: { 'content-type' : 'application/json' },
				json: true
			},
			(err, res, body) => {
        		handleResponse(err, res, 200, parsePlaylists(body), cb)
        	}
		)
		//http://localhost:9200/yama/playlist/ocKQPWoBFqJyB8idQUxg
    }
	deletePlaylist(playlistId,cb) {
		request.delete(
			{
				uri:`${this.uri}/playlist/${playlistId}`,
				headers: { 'content-type' : 'application/json' },
				json: true
			},
			(err, res, body) => {
        		handleResponse(err, res, 200, { 'status': 'deleted' }, cb)
        	}
		)
		//http://localhost:9200/yama/playlist/ocKQPWoBFqJyB8idQUxg
    }
}
function parsePlaylists(playlist) {
    let res = {
		'_id': playlist._id,
        'name': playlist._source.name,
		'description': playlist._source.description,
		'duration': playlist._source.duration,
        'musics': playlist._source.musics, 
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
            cb({ 'code': res.statusCode, 'message': 'Playlist does not exist' }, null); break
        default: 
            cb({ 'code': res.statusCode, 'message': message }, null); break
    }
}
 
module.exports = YamaDb