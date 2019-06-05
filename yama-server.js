'use strict'

//const bodyParser = require('body-parser')
const http = require('http')
const morgan = require('morgan')
const express = require('express')
const app = express()
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const nconf = require('nconf') 
//const expressSession = require('express-session')

const port = 3000
const api_info = {
	'API_KEY': 'f72aedc9562cd94f698840409f292395',
	'yama_api': 'http://ws.audioscrobbler.com/2.0/',
}
const es = {
	'host': 'localhost',
	'port': 9200,
	'index': 'yama'
}
const lastfmData = require('./data/lastfm-data').init(api_info)
const yamaDb = require('./data/yama-db').init(es)
const yamaServices = require('./services/yama-services').init(lastfmData, yamaDb)
 
nconf
    .argv()
    .env()
    .defaults({'NODE_ENV': 'development'})
const NODE_ENV = nconf.get('NODE_ENV')
const isDev = NODE_ENV == 'development'
console.log('Running ' + NODE_ENV)
 
app.use(morgan('dev'))
//app.use(bodyParser.json())
//app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: true}))
app.use(frontEndMiddleware(isDev))

require('./web-api/yama-web-api')(app, yamaServices)

http
    .createServer(app)
    .listen(port, (e) => {
	if (e)
		return console.log(e)
	console.log('HTTP Server running on port ' + port)
})

function frontEndMiddleware(isDev){
    return isDev
    ? webpackMiddleware(webpack(webpackConfig))
    : express.static('dist')
}

//mocks start//
//const lastfmData = require('./data/lastfm-data-mock').init(api_info)
//const yamaDb = require('./data/yama-db-mock').init(es)
//const yamaServices = require('./services/yama-services-mock').init(lastfmData,yamaDb)
//mocks end//
