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
			if(body.name)  p.name = body.name
			if(body.description) p.description = body.description
			//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
			delete p._id
			this.yamaDb.editPlaylist(playlistId,p,(err, data) => {
				if(err)
					return cb(err) 
				cb(null, data)
			})
		})
	}
	addMusicToPlaylist(playlistId,albumId,musicName, cb) { 
		this.yamaDb.getPlaylistInfo(playlistId, (err, pl) => {
			if(err)
				return cb(err)
			this.lastfmData.getTracksByMbid(albumId,(err, data) => {
				if(err)
					return cb(err)
				const idx = data.tracks.track.findIndex(track => track.name == musicName)
				if(idx < 0)
					return cb({ 'code': 404, 'message': 'album does not contain that music'}, null)
				const idx2 = pl.musics.findIndex(track => track.url == data.tracks.track[idx].url)
				if(idx2 >= 0)
					return cb({ 'code': 409, 'message': 'music alredy inserted in playlist'}, null)
				const dur = parseInt(data.tracks.track[idx].duration)
				pl.duration = pl.duration+dur // add the duration time of the song
				console.log(pl.duration)
				// colocar uma musica apenas com a informacao que queremos
				const music = {'name': data.tracks.track[idx].name,'url':data.tracks.track[idx].url,'duration': dur,'artist' :data.tracks.track[idx].artist}
				pl.musics.push(music)
				//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
				delete pl._id
				this.yamaDb.editPlaylist(playlistId, pl, (err, data2) => {
					if(err) 
						return cb(err)
					cb(null, { 'status': 'updated' })
				})
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
			pl.duration = parseInt(pl.duration-dur) // extract the duration time of the song removed
			console.log(pl.duration)
			pl.musics.splice(idx, 1) // removes 1 element at index idx
			//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
			delete pl._id
			this.yamaDb.editPlaylist(playlistId, pl, (err, data) => {
			if(err)
				return cb(err)
			cb(null, { 'status': 'deleted' })
			})
		})
	}
  
}

module.exports = Services

