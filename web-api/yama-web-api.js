'use strict'


module.exports = (app,yamaServices) => {
	
	const request = require('request')
	
	app.get('/api/artists/:name', getArtistsByName)
	/*
	app.get('/api/albums/:mbid', getAlbumsByMbid)
	app.get('/api/albums/:mbid/tracks', getTracksByMbid)
	app.get("/yama/playlists", getPlaylists)
	app.get("/yama/playlists/:id",getPlaylistInfo)
	app.put("/yama/playlists/:id/:musicId",addMusicToPlaylist)
	app.put("/yama/playlist/:name/:description", editPlaylist)
	app.delete("/yama/playlists/:id/:musicId",deleteMusicFromPlaylist)
	*/
	app.use(resourceNotFound)
	return app
 
	function getArtistsByName(req, resp){
		let name = req.params.name 
		const uri = `${es.yama_api}?method=artist.search&artist=${name}&api_key=${es.Api_token}&format=json`  // necessita criar variável com url do site em vez de hardcoded
			request.get(uri, (err, res, body) =>{
				res.statusCode = statusCode
				res.end(JSON.stringify(data))
			})
	}
	/*
	function getAlbumsByMbid(req, resp){
		//http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=5ae3ee8e-2bfd-4ffe-8551-e571f25f24a2&api_key=f72aedc9562cd94f698840409f292395&format=json
		let mbid = req.params.mbid
		const uri = `${es.yama_api}?method=artist.gettopalbums&mbid=${mbid}&api_key=${es.Api_token}&format=json`  
			request.get(uri, (err, res, body) =>{
				body = JSON.parse(body)
				console.log(body.topalbums.album[0])
			})
	}

	function getTracksByMbid(req, resp){
		//http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=YOUR_API_KEY&artist=Cher&album=Believe&format=json
		let mbid = req.params.mbid
	}
	  
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


