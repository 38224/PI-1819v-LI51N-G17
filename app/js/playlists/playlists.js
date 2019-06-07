'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const playlistsView = require('./../../views/playlists/playlists.html')
const playlistsResults =  Handlebars.compile(require('./../../views/playlists/components/playlistsResults.hbs').default)

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
				// input fields-----------------------------------------
				const playlistNameInput = document.getElementById('playlistName')
				const playlistDescriptionInput = document.getElementById('playlistDescription')
				const playlistIdInput = document.getElementById('playlistId')
				const albumIdInput = document.getElementById('albumId')
				const musicNameInput = document.getElementById('musicName')
				// add listeners ---------------------------------------
				document.getElementById('buttonSearch')
					.addEventListener('click', async ev => {
						ev.preventDefault()
						const playlists = await yamaApi.getAllPlaylists()
						if(playlists.length != 0){
							
							divPlaylistsResults.innerHTML = playlistsResults(playlists)
						}
					})
				//-------------------------------------
				document.getElementById('buttonCreatePlaylist')
					.addEventListener('click', async ev => {
						ev.preventDefault()
						if(!playlistIdInput.value || !playlistNameInput.value || !playlistDescriptionInput.value)
							return util.showAlert('All camps must be filled', 'createGroupAlert', 'warning')
						const res = await yamaApi.editPlaylist(playlistIdInput.value,playlistNameInput.value, playlistDescriptionInput.value)
						alert('Lista criada')
					})

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
