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
	getPlaylistInfo(id,cb) {
        this.yamaDb.getPlaylistInfo(id,cb)
	}
	editPlaylist(playlistId,body,cb) {

		this.yamaDb.getPlaylistInfo(playlistId,(err, p) => { 
			if(err)
				return cb(err)
			if(!body.name)  body.name = p.name
			if(!body.description) body.description = p.description
			body.musics = p.musics 
			this.yamaDb.editPlaylist(playlistId,body,(err, data) => {
				if(err)
					return cb(err) 
				cb(null, data)
			})
		})
	}
  
}

module.exports = Services

