'use strict'

const bodyParser = require('body-parser')
const http = require('http')
const morgan = require('morgan')
const express = require('express')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const nconf = require('nconf')
const expressSession = require('express-session')
const yamaWebApi = require('./web-api/yama-web-api')
const port = 3000

// AUTH SECTION  /// FAZER AUTH-WEB-API,USERS-DB,AUTH-SERVICES

const authWebApi = require('./web-api/auth-web-api')
const esAuth = {
    'host': 'localhost',
    'port': 9200,
    'index': 'users/user'
}
const usersDB = require('./data/user-db').init(esAuth)
const authService = require('./services/auth-services').init(usersDB)

// AUTH SECTION END


const api_info = {
    'API_KEY': 'f72aedc9562cd94f698840409f292395',
    'yama_api': 'http://ws.audioscrobbler.com/2.0/'
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
    .defaults({ 'NODE_ENV': 'development' })
const NODE_ENV = nconf.get('NODE_ENV')
const isDev = NODE_ENV == 'development'
console.log('Running ' + NODE_ENV)

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: true }))
app.use(frontEndMiddleware(isDev))
authWebApi(app, authService)
yamaWebApi(app, yamaServices) 

http
    .createServer(app)
    .listen(port, () => console.log('HTTP Server running on port ' + port))

function frontEndMiddleware(isDev) {
    return isDev
        ? webpackMiddleware(webpack(webpackConfig))
        : express.static('dist')
}

//mocks start//
//const lastfmData = require('./data/lastfm-data-mock').init(api_info)
//const yamaDb = require('./data/yama-db-mock').init(es)
//const yamaServices = require('./services/yama-services-mock').init(lastfmData,yamaDb)
//mocks end//
 