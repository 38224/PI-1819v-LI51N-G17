'use strict'

const bodyParser = require('../utils/body-parser')

module.exports = (app,yamaServices) => {

	app.get('/api/artists/:name', getArtistsByName)
	app.get('/api/albums/:mbid', getAlbumsByMbid)
	app.get('/api/albums/:mbid/tracks', getTracksByMbid)
	app.post("/yama/playlist", createPlaylist) 
	app.get("/yama/playlists", getPlaylists)
	app.get("/yama/playlist/:mbid",getPlaylistInfo)
	app.put("/yama/playlist/:playlistId", editPlaylist)
	/*to be implemented \/ // 
	app.put("/yama/playlists/:id/:musicId",addMusicToPlaylist)~
	app.delete("/yama/playlists/:id/:musicId",deleteMusicFromPlaylist)
	// to be implemented end */
	app.use(resourceNotFound)
	return app
 
	function getArtistsByName(req, resp){ 
		let name = req.params.name 
		yamaServices.getArtistsByName(name,(err,data) => {
			handleResponse(resp,200,err,data)
		}) 
	}
	 
	function getAlbumsByMbid(req, resp){
		let mbid = req.params.mbid
		yamaServices.getAlbumsByMbid(mbid,(err,data) => {
			handleResponse(resp,200,err,data)
		}) 
	}
	
	function getTracksByMbid(req, resp){
		let mbid = req.params.mbid
		yamaServices.getTracksByMbid(mbid,(err,data) => {
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
		let mbid = req.params.mbid		
		yamaServices.getPlaylistInfo(mbid,(err,data) => {
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


