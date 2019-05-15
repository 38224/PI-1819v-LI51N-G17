'use strict'

const bodyParser = require('body-parser').json()

module.exports = (app,yamaServices) => {

	app.get('/api/artists/:artistName', getArtistsByName)
	app.get('/api/artists/:artistId/albums', getAlbumsByMbid)
	app.get('/api/albums/:albumId/tracks', getTracksByMbid)
	app.post("/yama/playlists", bodyParser , createPlaylist) 
	app.get("/yama/playlists", getPlaylists)
	app.get("/yama/playlists/:playlistId",getPlaylistInfo)
	app.put("/yama/playlists/:playlistId",bodyParser, editPlaylist)
	app.put("/yama/playlists/:playlistId/albums/:albumId/musics/:musicName",addMusicToPlaylist)
	app.delete("/yama/playlists/:playlistId/musics/:musicName",deleteMusicFromPlaylist)
	app.delete("/yama/playlists/:playlistId",deletePlaylist)
	app.use(resourceNotFound)
 
	function getArtistsByName(req, resp,next){ 
		let artistName = req.params.artistName
		return yamaServices.getArtistsByName(artistName)
		.catch(next)
		.then(artists => resp.json(artists))
	}
	
	function getAlbumsByMbid(req, resp,next){
		let artistId = req.params.artistId
		return yamaServices.getAlbumsByMbid(artistId)
		.catch(next)
		.then(albums => resp.json(albums))
	}
	
	function getTracksByMbid(req, resp,next){
		let albumId = req.params.albumId
		return yamaServices.getTracksByMbid(albumId)
		.catch(next)
		.then(tracks => resp.json(tracks)) 
	}
	
	function createPlaylist(req, resp,next){  
		return yamaServices.createPlaylist(req.body)
		.catch(next)
		.then(playlistInfo => resp.status(201).json(playlistInfo)) 
	}
	function getPlaylists(req, resp,next){ 
		return yamaServices.getPlaylists()
		.catch(next)
		.then(playlists => resp.json(playlists))
	}
	function getPlaylistInfo(req, resp,next){
		let playlistId = req.params.playlistId		
		return yamaServices.getPlaylistInfo(playlistId)
		.catch(next)
		.then(playlistInfo => resp.json(playlistInfo)) 
	}
	function editPlaylist(req, resp,next){
		let playlistId = req.params.playlistId  
		return yamaServices.editPlaylist(playlistId,req.body)
		.catch(next)
		.then(playlistInfo => resp.json(playlistInfo))
		
	}
	function addMusicToPlaylist(req, resp,next){ //MISSING
		let playlistId = req.params.playlistId	
		let albumId = req.params.albumId	
		let musicName = req.params.musicName	
		return yamaServices.addMusicToPlaylist(playlistId,albumId,musicName)
		.catch(next)
		.then(musicInfo => resp.json(musicInfo))
	}
	function deleteMusicFromPlaylist(req, resp,next){//MISSING
		let playlistId = req.params.playlistId	
		let musicName = req.params.musicName	
		return yamaServices.deleteMusicFromPlaylist(playlistId,musicName)
		.catch(next)
		.then(musicInfo => resp.json(musicInfo))
	}
	function deletePlaylist(req, resp,next){
		let playlistId = req.params.playlistId		
		return yamaServices.deletePlaylist(playlistId)
		.catch(next)
		.then(deletedInfo => resp.json(deletedInfo)) 
	}
    function resourceNotFound(req, res, next) {
        next({
            'statusCode': 404,
            'message': 'Resource Not Found'
        })
    }
}


