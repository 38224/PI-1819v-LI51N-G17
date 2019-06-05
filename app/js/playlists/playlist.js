'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const musicsResults = Handlebars.compile(require('./../../views/playlist/components/PlaylistMusicsResults.hbs').default)

const playlistView = require('./../../views/playlist/playlist.html')
//const editPlaylist = Handlebars.compile(require('./../../views/playlist/components/editPlaylist.hbs'))

module.exports = async (divMain, playlistId) => {
        try {
			/*
                const session = await yamaApi.session()
                if(!session.auth) {
                        window.location.hash = '#login'
                }
                else {
			*/
			divMain.innerHTML = playlistView
			const playlist = await yamaApi.getPlaylist(playlistId) 
			if(playlist.musics.length != 0){
				
				document
						.getElementById('divMusicsResults')
						.innerHTML = musicsResults(playlist.musics)
				playlist.musics.forEach(function(element) {
				
				document.querySelector("#removeMusic_"+element.name).addEventListener("click", function() {
						yamaApi.deleteMusicFromPlaylist(playlistId,element.name)
					})
				})
			}
                
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
		
		
}