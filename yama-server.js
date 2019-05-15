'use strict'
  
const port = 3000
const api_info = {
	'API_KEY' :'f72aedc9562cd94f698840409f292395',
	'yama_api':'http://ws.audioscrobbler.com/2.0/',
} 
const es = {
	'host':'localhost',
	'port':9200,
	'index': 'yama'
} 
const lastfmData = require('./data/lastfm-data').init(api_info)
const yamaDb = require('./data/yama-db').init(es)
const yamaServices = require('./services/yama-services').init(lastfmData,yamaDb)
 
//mocks start//
//const lastfmData = require('./data/lastfm-data-mock').init(api_info)
//const yamaDb = require('./data/yama-db-mock').init(es)
//const yamaServices = require('./services/yama-services-mock').init(lastfmData,yamaDb)
//mocks end//
 
const express = require('express')
const app = express()
require('./web-api/yama-web-api')(app, yamaServices)

app.listen(port, (e) => {
	if(e) return console.log(e)
	console.log('HTTP Server running on port ' + port)
	})