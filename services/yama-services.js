'use strict'
 
class Services {
	
	constructor(lastfmData,yamaDb) {
		this.lastfmData = lastfmData
        this.yamaDb = yamaDb
	}
	
	static init(lastfmData,yamaDb) {
		return new Services(lastfmData,yamaDb)
	}
	getArtistsByName(name,cb) { 
        this.lastfmData.getArtistsByName(name,cb)
    }
	getAlbumsByMbid(mbid,cb) { 
        this.lastfmData.getAlbumsByMbid(mbid,cb)
    }
	getTracksByMbid(mbid,cb) {  
        this.lastfmData.getTracksByMbid(mbid,cb)
    }
	createPlaylist(body,cb) {
        this.yamaDb.createPlaylist(body,cb)
	}
	getPlaylists(cb) {
        this.yamaDb.getPlaylists(cb)
	}
}

module.exports = Services

