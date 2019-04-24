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


	deleteMusicFromPlaylist(playlistId,musicName, cb) {
		this.yamaDb.getPlaylistInfo(playlistId, (err, pl) => {
			if(err)
			return cb(err)
			const idx = pl.musics.findIndex(track => track.name == musicName)
			if(idx < 0)
				return cb({ 'code': 400, 'message': 'playlist does not contain that music'}, null) 
			const dur = pl.musics[idx].duration
			pl.duration -= dur // extract the duration time of the song removed
			pl.musics.splice(idx, 1) // removes 1 element at index idx
			this.yamaDb.editPlaylist(playlistId, pl, (err, data) => {
			if(err)
				return cb(err)
			cb(null, { 'status': 'deleted' })
			})
		})
	}
  
}

module.exports = Services

