'use strict'

const assert = require('assert')
const LastFmDataMock = require('../data/lastfm-data-mock').init('')
const YamaDbMock = require('../data/yama-db-mock').init()
const focaService = require('../services/foca-service-mock').init(FootballDataMock, focaDbMock)
//const focaService = require('../services/foca-service').init(FootballDataMock, focaDbMock)

describe('Test Foca-Services', () => {
