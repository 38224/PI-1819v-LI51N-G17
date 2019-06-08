'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const TracksView = require('./../../views/tracks/track.html')
const TracksResults =  Handlebars.compile(require('./../../views/tracks/components/TrackResults.hbs').default)
//divTracksResults
module.exports = async (divMain,mbid) => {
        try {
                /*
				const session = await yamaApi.session()
                if(!session.auth) {
                        window.location.hash = '#login'
                }
                else {
					
				*/
				
				divMain.innerHTML = TracksView
				const divTracksResults = document.getElementById('divTracksResults')
				const tracks = await yamaApi.getTracks(mbid)
				if(tracks.length != 0)
					divTracksResults.innerHTML = TracksResults(tracks)
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
}
