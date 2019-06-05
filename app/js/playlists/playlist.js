'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const playlistMusicsHB = require('./../../views/playlist/components/PlaylistMusicsResults.hbs')

const playlistView = require('./../../views/playlist/playlist.html')
//const editPlaylist = Handlebars.compile(require('./../../views/playlist/components/editPlaylist.hbs'))

module.exports = async (divMain, mbid) => {
        try {
			/*
                const session = await yamaApi.session()
                if(!session.auth) {
                        window.location.hash = '#login'
                }
                else {
			*/
			divMain.innerHTML = playlistView
			const playlist = await yamaApi.getPlaylist(mbid) 
			if(playlist.musics.length != 0){
				const musicsResults = Handlebars.compile(playlistMusicsHB)
				document
						.getElementById('divMusicsResults')
						.innerHTML = musicsResults(playlist.musics)
			}
                
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
}