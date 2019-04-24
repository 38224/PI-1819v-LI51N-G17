'use strict'

const bodyParser = require('../utils/body-parser')

module.exports = (app,yamaServices) => {

	app.get('/api/artists/:artistName', getArtistsByName)
	app.get('/api/artists/:artistId/albums', getAlbumsByMbid)
	app.get('/api/albums/:albumId/tracks', getTracksByMbid)
	app.post("/yama/playlists", createPlaylist) 
	app.get("/yama/playlists", getPlaylists)
	app.get("/yama/playlists/:playlistId",getPlaylistInfo)
	app.put("/yama/playlists/:playlistId", editPlaylist)
	app.put("/yama/playlists/:playlistId/albums/:albumId/musics/:musicName",addMusicToPlaylist)
	app.delete("/yama/playlists/:playlistId/musics/:musicName",deleteMusicFromPlaylist)
	app.use(resourceNotFound)
	return app
 
	function getArtistsByName(req, resp){ 
		let artistName = req.params.artistName 
		yamaServices.getArtistsByName(artistName,(err,data) => {
			handleResponse(resp,200,err,data)
		}) 
	}
	 
	function getAlbumsByMbid(req, resp){
		let artistId = req.params.artistId
		yamaServices.getAlbumsByMbid(artistId,(err,data) => {
			handleResponse(resp,200,err,data)
		}) 
	}
	
	function getTracksByMbid(req, resp){
		let albumId = req.params.albumId
		yamaServices.getTracksByMbid(albumId,(err,data) => {
			handleResponse(resp,200,err,data)
		})
	}
	function createPlaylist(req, resp){ 
		bodyParser(req,(body) =>{
			yamaServices.createPlaylist(body,(err,data) => {
				handleResponse(resp,201,err,data)
			}) 
		})
	}
	function editPlaylist(req, resp){ 
		let playlistId = req.params.playlistId
		bodyParser(req,(body) =>{
			yamaServices.editPlaylist(playlistId,body,(err,data) => {
				handleResponse(resp,200,err,data)
			}) 
		})
	}
	function getPlaylists(req, resp){ 
		yamaServices.getPlaylists((err,data) => {
			handleResponse(resp,200,err,data)
		})
	}
	function getPlaylistInfo(req, resp){
		let playlistId = req.params.playlistId		
		yamaServices.getPlaylistInfo(playlistId,(err,data) => {
			handleResponse(resp,200,err,data)
		})
	}

	function deleteMusicFromPlaylist(req, resp){
		let playlistId = req.params.playlistId	
		let musicName = req.params.musicName	
		yamaServices.deleteMusicFromPlaylist(playlistId,musicName,(err,data) => {
			handleResponse(resp,200,err,data)
		})
	}
	
 
    function resourceNotFound(req, res) {
        res.statusCode = 404
        res.end('Resource Not Found')
        return true
    }
}
function handleResponse(res, statusCode, err, data) {
    if(err){
        res.statusCode = err.code
        err.message ?
            res.end(err.message)
            : res.end()
    } else {
        res.statusCode = statusCode 
        res.end(JSON.stringify(data))
    }
}


