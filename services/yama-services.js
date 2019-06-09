'use strict'

class Services {

	constructor(lastfmData, yamaDb) {
		this.lastfmData = lastfmData
		this.yamaDb = yamaDb
	}

	static init(lastfmData, yamaDb) {
		return new Services(lastfmData, yamaDb)
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

	createPlaylist(userID,body) {
		body.user_id = userID
		return this.yamaDb.createPlaylist(body)
	}

	getPlaylists(userID) {
		return this.yamaDb.getPlaylists(userID)
	}

	getPlaylistInfo(id) {
		return this.yamaDb.getPlaylistInfo(id)
	}

	editPlaylist(playlistId, body) {
		return this.yamaDb.getPlaylistInfo(playlistId)
			.then(p => {
				if (body.name) p.name = body.name
				if (body.description) p.description = body.description
				//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
				delete p._id
				return p
			})
			.then(p => this.yamaDb.editPlaylist(playlistId, p))
	}

	deletePlaylist(playlistId) {
		return this.yamaDb.deletePlaylist(playlistId)
	}

	async addMusicToPlaylist(playlistId, albumId, musicName) {
		const [playlist, album] = await Promise.all([
			this.yamaDb.getPlaylistInfo(playlistId),
			this.lastfmData.getTracksByMbid(albumId)
		])
		const idx = album.tracks.track.findIndex(track => track.name == musicName)
		if (idx < 0)
			return Promise.reject({ 'statusCode': 404, 'message': 'album does not contain that music' })
		const idx2 = playlist.musics.findIndex(track => track.url == album.tracks.track[idx].url)
		if (idx2 >= 0)
			return Promise.reject({ 'statusCode': 409, 'message': 'music alredy inserted in playlist' })
		const dur = parseInt(album.tracks.track[idx].duration)
		playlist.duration = playlist.duration + dur // add the duration time of the song 
		// colocar uma musica apenas com a informacao que queremos
		const music = { 'name': album.tracks.track[idx].name, 'url': album.tracks.track[idx].url, 'duration': dur, 'artist': album.tracks.track[idx].artist }
		playlist.musics.push(music)
		//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
		delete playlist._id
		return this.yamaDb.editPlaylist(playlistId, playlist)
	}

	deleteMusicFromPlaylist(playlistId, musicName) {
		return this.yamaDb.getPlaylistInfo(playlistId)
			.then(pl => {
				const idx = pl.musics.findIndex(track => track.name == musicName)
				if (idx < 0)
					return Promise.reject({ 'statusCode': 400, 'message': 'playlist does not contain that music' })
				const dur = pl.musics[idx].duration
				pl.duration = parseInt(pl.duration - dur) // extract the duration time of the song removed 
				pl.musics.splice(idx, 1) // removes 1 element at index idx
				//tirar o _id porque 'Field [_id] is a metadata field and cannot be added inside a document.'
				delete pl._id
				return pl
			})
			.then(pl => this.yamaDb.editPlaylist(playlistId, pl))
	}
}

module.exports = Services

