'use strict'
 
class Yama {
	
	constructor(lastfmData,yamaDb) {
		this.lastfmData = lastfmData
        this.yamaDb = yamaDb
	}
	
	static init(lastfmData,yamaDb) {
		return new Yama(lastfmData,yamaDb)
	}
	getArtistsByName(cb) {
        this.lastfmData.getArtistsByName(cb)
    }
	 

}

