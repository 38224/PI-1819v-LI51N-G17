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
				const playlist = await yamaApi.getAllPlaylists()
				divPlaylistsResults.innerHTML = playlistsResults(playlist)
				// input fields-----------------------------------------
				const playlistNameInput = document.getElementById('playlistName')
				const playlistDescriptionInput = document.getElementById('playlistDescription')
				// add listeners ---------------------------------------
				
				document.getElementById('buttonCreatePlaylist')
					.addEventListener('click', async ev => {
						ev.preventDefault() 
						if(!playlistNameInput.value || !playlistDescriptionInput.value)
							return util.showAlert('preencha todos os parametro', 'createPlaylistAlert', 'warning')
						const playlists = await yamaApi.createPlaylist(playlistNameInput.value,playlistDescriptionInput.value)
						alert("lista criada")
						window.location.reload(true)
					})
				playlist.forEach(function(element) {
				document.querySelector("#buttonDeletePlaylist_"+element._id).addEventListener("click", function() {
					yamaApi.deletePlaylist(element._id)
					alert('playlist deleted')
					window.location.reload(true)
				})
			})
				 
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
}
