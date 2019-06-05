'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const playlistsHB = require('./../../views/playlists/components/playlistsResults.hbs')
const playlistsView = require('./../../views/playlists/playlists.html')

module.exports = async (divMain) => {
        try {
                /*
				const session = await yamaApi.session()
                if(!session.auth) {
                        window.location.hash = '#login'
                }
                else {
					
				*/
				divMain.innerHTML = playlistsView
				const divPlaylistsResults = document.getElementById('divPlaylistsResults')
				const playlists = await yamaApi.getAllPlaylists()
				if(playlists.length != 0){
					const playlistsResults =  Handlebars.compile(playlistsHB)
					divPlaylistsResults.innerHTML = playlistsResults(playlists)
				}

				/*
				const inputName = document.getElementById('inputPlaylistName')
				const inputDescription = document.getElementById('inputPlaylistDescription')
				document
						.getElementById('buttonCreatePlaylist')
						.addEventListener('click', async (ev) => {
								ev.preventDefault()
								if(!inputName.value || !inputDescription.value) 
										return util.showAlert('preencha todos os parametro', 'createPlaylistAlert', 'warning')
								const res = await yamaApi.createPlaylist(inputName.value, inputDescription.value)
								window.location.hash = `#playlists/${res._id}`
						})
				*/
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
}
