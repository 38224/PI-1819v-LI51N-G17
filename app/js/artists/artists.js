'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const artistsView = require('./../../views/artists/artist.html')
const artistsResults =  Handlebars.compile(require('./../../views/artists/components/ArtistsResults.hbs').default)
//divArtistsResults
module.exports = async (divMain) => {
        try { 
				divMain.innerHTML = artistsView
				const divArtistsResults = document.getElementById('divArtistsResults')
				// input fields-----------------------------------------
				const artistNameInput = document.getElementById('artistName')
				// add listeners ---------------------------------------
				document.getElementById('buttonSearch')
					.addEventListener('click', async ev => {
						ev.preventDefault()
						const artists = await yamaApi.getArtist(artistNameInput.value)
						if(artists.length != 0){
							divArtistsResults.innerHTML = artistsResults(artists)
						}
					}) 
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
}
