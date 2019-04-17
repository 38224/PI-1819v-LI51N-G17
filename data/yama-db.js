'use strict'

class YamaDb {
	 
	constructor(es) { 
		this.uri = `http://${es.host}:${es.port}/${es.index}`
	}
	
	static init(es) {
		return new YamaDb(es)
	}
	createPlaylist(name,description,cb) { 
        
    }
}
 
module.exports = YamaDb