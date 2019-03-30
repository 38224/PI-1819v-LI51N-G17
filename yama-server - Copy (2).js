'use strict'

const http = require('http')
const app = require('express')
const request = require('request') //a tirar para por no yamaData

let API_KEY = 'f72aedc9562cd94f698840409f292395'
//http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=freddy+mercury&api_key=f72aedc9562cd94f698840409f292395&format=json

app.get('/api/artist/:name', getArtistByName)

function getArtistByName(){
	let name = req.params.leagueId
	const uri = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${API_KEY}&format=json`  // necessita criar variável com url do site em vez de hardcoded
        request.get(uri, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb)){
                body = JSON.parse(body)
                console.log(body)
				/*
				let comps = {} 
                comps.count = body.count
                comps.competitions= []
                body.competitions.forEach(c => {
                    comps.competitions.push({
                        'id':c.id,
                        'name': c.area.name,
                        'description':c.name,
                    })
                })
				*/
				
                cb(null, body)
            }
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

http
    .createServer()
    .listen(3000, () => console.log('HTTP Server running on port 3000'))
	
	