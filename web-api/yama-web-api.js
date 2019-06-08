'use strict'

//const bodyParser = require('body-parser').json()

module.exports = (app, yamaServices) => {

	app.get('/api/artists/:artistName', getArtistsByName)
	app.get('/api/artists/:artistId/albums', getAlbumsByMbid)
	app.get('/api/albums/:albumId/tracks', getTracksByMbid)
	app.post("/yama/playlists", createPlaylist)
	app.get("/yama/playlists", getPlaylists)
	app.get("/yama/playlists/:playlistId", getPlaylistInfo)
	app.put("/yama/playlists/:playlistId", editPlaylist)
	app.put("/yama/playlists/:playlistId/albums/:albumId/musics/:musicName", addMusicToPlaylist)
	app.delete("/yama/playlists/:playlistId/musics/:musicName", deleteMusicFromPlaylist)
	app.delete("/yama/playlists/:playlistId", deletePlaylist)
	app.use(resourceNotFound)
	app.use(errorHandler)

	function getArtistsByName(req, resp, next) {
		let artistName = req.params.artistName
		return executor(
			yamaServices.getArtistsByName(artistName),
			resp,
			next
		)
	}

	function getAlbumsByMbid(req, resp, next) {
		let artistId = req.params.artistId
		return executor(
			yamaServices.getAlbumsByMbid(artistId),
			resp,
			next
		)
	}

	function getTracksByMbid(req, resp, next) {
		let albumId = req.params.albumId
		return executor(
			yamaServices.getTracksByMbid(albumId),
			resp,
			next
		)
	}

	function createPlaylist(req, resp, next) {
		resp.status(201)
		return executor(
			yamaServices.createPlaylist(req.body),
			resp,
			next
		)

	}
	function getPlaylists(req, resp, next) {
		return executor(
			yamaServices.getPlaylists(),
			resp,
			next
		)

	}
	function getPlaylistInfo(req, resp, next) {
		let playlistId = req.params.playlistId
		return executor(
			yamaServices.getPlaylistInfo(playlistId),
			resp,
			next
		)

	}

	function editPlaylist(req, resp, next) {
		let playlistId = req.params.playlistId
		return executor(
			yamaServices.editPlaylist(playlistId, req.body),
			resp,
			next
		)

	}

	function addMusicToPlaylist(req, resp, next) { //MISSING
		let playlistId = req.params.playlistId
		let albumId = req.params.albumId
		let musicName = req.params.musicName

		return executor(
			yamaServices.addMusicToPlaylist(playlistId, albumId, musicName),
			resp,
			next
		)
	}

	function deleteMusicFromPlaylist(req, resp, next) {//MISSING
		let playlistId = req.params.playlistId
		let musicName = req.params.musicName
		return executor(
			yamaServices.deleteMusicFromPlaylist(playlistId, musicName),
			resp,
			next
		)
	}

	function deletePlaylist(req, resp, next) {
		let playlistId = req.params.playlistId
		return executor(
			yamaServices.deletePlaylist(playlistId),
			resp,
			next
		)
	}

	function resourceNotFound(req, res, next) {
		next({
			'statusCode': 404,
			'message': 'Resource Not Found'
		})
	}

	function errorHandler(err, req, resp, next) {
		resp.status(err.statusCode).send(err)
	}

	function executor(promise, resp, next) {
		return promise
			.catch(err => errorHandler(err, resp))
			.then(p => resp.json(p))
			.then(next)
	}
}


