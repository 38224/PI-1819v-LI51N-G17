'use strict'
 
class Services {
	
	constructor(lastfmData,yamaDb) {
		this.lastfmData = lastfmData
        this.yamaDb = yamaDb
	}
	
	static init(lastfmData,yamaDb) {
		return new Services(lastfmData,yamaDb)
	}
	getArtistsByName(name) {
		return this.lastfmData.getArtistsByName(name)
    }
	getAlbumsByMbid(mbid) {
        return this.lastfmData.getAlbumsByMbid(mbid)
    }
	getTracksByMbid(mbid) {  
        return this.lastfmData.getTracksByMbid(mbid)
    }
	createPlaylist(body) {
        return this.yamaDb.createPlaylist(body)
	}
	getPlaylists() {
        return this.yamaDb.getPlaylists()
	}
	getPlaylistInfo(id) {
        return this.yamaDb.getPlaylistInfo(id)
	}
	editPlaylist(playlistId,body) {
		return this.yamaDb.getPlaylistInfo(playlistId)
		.then( p => {  
			if(body.name) p.name = body.name
			if(body.description) p.description = body.description
			//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
			delete p._id
			return this.yamaDb.editPlaylist(playlistId,p)
				.then(body=> Promise.resolve({ 'status': 'updated' }))
		})
	}
	deletePlaylist(playlistId) {
        return this.yamaDb.deletePlaylist(playlistId)
	}
	addMusicToPlaylist(playlistId,albumId,musicName) { 
	// SERÁ ASYNC e AWAIT com Promise.all([<funcoes>]), e retorna os valores dos promises 
		return this.yamaDb.getPlaylistInfo(playlistId)
		.then(pl => {
			return this.lastfmData.getTracksByMbid(albumId)
				.then(data => {
					const idx = data.tracks.track.findIndex(track => track.name == musicName)
					if(idx < 0)
						return Promise.reject({ 'statusCode': 404, 'message': 'album does not contain that music'})
					const idx2 = pl.musics.findIndex(track => track.url == data.tracks.track[idx].url)
					if(idx2 >= 0)
						return Promise.reject({ 'statusCode': 409, 'message': 'music alredy inserted in playlist'})
					const dur = parseInt(data.tracks.track[idx].duration)
					pl.duration = pl.duration+dur // add the duration time of the song 
					// colocar uma musica apenas com a informacao que queremos
					const music = {'name': data.tracks.track[idx].name,'url':data.tracks.track[idx].url,'duration': dur,'artist' :data.tracks.track[idx].artist}
					pl.musics.push(music)
					//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
					delete pl._id 
					return this.yamaDb.editPlaylist(playlistId, pl)
						.then(body=> Promise.resolve({ 'status': 'updated' }))
				})
		})
	}
	deleteMusicFromPlaylist(playlistId,musicName) {
		return this.yamaDb.getPlaylistInfo(playlistId)
			.then(pl => {
				const idx = pl.musics.findIndex(track => track.name == musicName)
				if(idx < 0)
					return Promise.reject({ 'statusCode': 400, 'message': 'playlist does not contain that music'})
				const dur = pl.musics[idx].duration
				pl.duration = parseInt(pl.duration-dur) // extract the duration time of the song removed 
				pl.musics.splice(idx, 1) // removes 1 element at index idx
				//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
				delete pl._id
				return this.yamaDb.editPlaylist(playlistId, pl)
					.then(body=> Promise.resolve({ 'status': 'deleted' }))
			})
	}
}

module.exports = Services

