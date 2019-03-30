'use strict'

const http = require('http')
const express = require('express')
const request = require('request') //a tirar para por no yamaData
const app = express()
let API_KEY = 'f72aedc9562cd94f698840409f292395'
//http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=freddy+mercury&api_key=f72aedc9562cd94f698840409f292395&format=json

//localhost:3000/api/artist/tony+carreira



app.get('/api/artist/:name', getArtistByName) // web-api
app.get('/api/album/:mbid', getAlbumByMbid) // web-api


//localhost:3000/api/artist/tony+carreira

function getArtistByName(req, resp){
	let name = req.params.name
	const uri = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${API_KEY}&format=json`  // necessita criar variável com url do site em vez de hardcoded
        request.get(uri, (err, res, body) =>{
			body = JSON.parse(body)
			console.log(body)
 
        })
}
function getAlbumByMbid(req, resp){
	//http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=5ae3ee8e-2bfd-4ffe-8551-e571f25f24a2&api_key=f72aedc9562cd94f698840409f292395&format=json
	let mbid = req.params.mbid
	const uri = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${mbid}&api_key=${API_KEY}&format=json`  
        request.get(uri, (err, res, body) =>{
			body = JSON.parse(body)
			console.log(body.topalbums.album[0])
        })
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
/*
app.listen(3000, () => console.log('HTTP Server running on port 3000'))
*/
http
    .createServer(app)
    .listen(3000, () => console.log('HTTP Server running on port 3000'))
