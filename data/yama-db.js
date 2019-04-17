'use strict'

const request = require('request')

class YamaDb {
	
	constructor(es) { 
		this.uri = `http://${es.host}:${es.port}/${es.index}`
	} // localhost:9200/yama
	
	static init(es) {
		return new YamaDb(es)
	}
	createPlaylist(playlist,cb) { 
	 
		request.post(
			{
				uri:`${this.uri}/playlist`,
				headers: { 'content-type' : 'application/json' },
				json: true,
				body: playlist
			}, 
            (err, res, body) => {
                handleResponse(err, res, 201, { 'status': 'created', '_id': body._id }, cb)
        })
    }
	createPlaylist(playlist,cb) {
		//http://localhost:9200/yama/playlist/_search
    }
	
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