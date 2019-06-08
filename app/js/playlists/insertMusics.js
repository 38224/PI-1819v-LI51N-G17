'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const insertMusicView = require('./../../views/playlists/insertMusic.html')
const insertMusicResults =  Handlebars.compile(require('./../../views/playlists/components/insertMusicResults.hbs').default)

module.exports = async (divMain,mbid,musicName) => {
        try {
                /*
				const session = await yamaApi.session()
                if(!session.auth) {
                        window.location.hash = '#login'
                }
                else {
					
				*/
				divMain.innerHTML = insertMusicView
				const divinsertMusicResults = document.getElementById('divinsertMusicResults')
				const playlist = await yamaApi.getAllPlaylists()
				// add listeners --------------------------------------
				divinsertMusicResults.innerHTML = insertMusicResults(playlist)
					
				playlist.forEach(function(element) {
						document.querySelector("#buttonInsertMusic_"+element._id).addEventListener("click", function() {
						yamaApi.addMusicToPlaylist(element._id,mbid,musicName)
						alert('music inserted')
						window.location.href = "http://localhost:3000/#playlists/"+element._id
					})
				})
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
}
