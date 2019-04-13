'use strict'

const http = require('http')
const Router = require('./utils/router')
 
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
const app = new Router()
require('./web-api/yama-web-api')(app, yamaServices)

http
    .createServer(app.find.bind(app))
    .listen(3000, () => console.log('HTTP Server running on port 3000'))