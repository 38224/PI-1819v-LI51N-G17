'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const playlistResult = Handlebars.compile(require('./../../views/playlists/components/playlistResults.hbs').default)
const playlistView = require('./../../views/playlists/playlist.html')


module.exports = async (divMain, playlistId) => {
        try {
			divMain.innerHTML = playlistView
			const divPlaylistResults = document.getElementById('divPlaylistResults')
			const playlist = await yamaApi.getPlaylist(playlistId) 
			divPlaylistResults.innerHTML = playlistResult(playlist)
			// input fields-----------------------------------------
			const playlistNameInput = document.getElementById('playlistName')
			const playlistDescriptionInput = document.getElementById('playlistDescription')
			
			document.getElementById('buttonEditPlaylist')
					.addEventListener('click', async ev => {
						ev.preventDefault() 
						if(!playlistNameInput.value || !playlistDescriptionInput.value)
							return util.showAlert('preencha todos os parametro')
						const playlists = await yamaApi.editPlaylist(playlistId,playlistNameInput.value,playlistDescriptionInput.value)
						alert("lista alterada")
						window.location.href = "http://localhost:3000/#playlists"
					})
					
			playlist.musics.forEach(function(element) {
				document.querySelector("#buttonDeleteMusic_"+element.duration).addEventListener("click", function() {
					yamaApi.deleteMusicFromPlaylist(playlistId,element.name)
					alert('música removida')
					//util.showAlert('música removida')
					window.location.reload()
					
				})
			})
                
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
		
		
}