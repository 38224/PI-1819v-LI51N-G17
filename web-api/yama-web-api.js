'use strict'


module.exports = (app,yamaServices) => {

	app.get('/api/artists/:name', getArtistsByName)
	app.get('/api/albums/:mbid', getAlbumsByMbid)
	app.get('/api/albums/:mbid/tracks', getTracksByMbid)
	app.post("/yama/playlist", createPlaylist) //passar para body em vez de query
	/*
	app.get("/yama/playlists", getPlaylists)
	app.get("/yama/playlists/:id",getPlaylistInfo)
	app.put("/yama/playlists/:id/:musicId",addMusicToPlaylist)
	app.put("/yama/playlist/:playlistId", editPlaylist)
	app.delete("/yama/playlists/:id/:musicId",deleteMusicFromPlaylist)
	*/
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
		let name = req.query.name
		let desc = req.query.description
		yamaServices.createPlaylist(name,desc,(err,data) => {
			handleResponse(resp,201,err,data)
		}) 
	}
	 /*
	function reportError(statusOk, err, res, body, cb) {
		if(err) {
			cb(err)
			return true
		}
		if(res.statusCode != statusOk) {
			cb({
				code: res.statusCode,
				message: res.statusMessage,
				error: body
			})
			return true
		}
	}
	*/
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


