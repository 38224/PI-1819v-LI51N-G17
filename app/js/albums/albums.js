'use strict'

const util = require('../util')
const yamaApi = require('../yama-api-requests.js')
const Handlebars = require('./../../../node_modules/handlebars/dist/handlebars.js')
const albumsView = require('./../../views/albums/album.html')
const albumsResults =  Handlebars.compile(require('./../../views/albums/components/AlbumResults.hbs').default)

module.exports = async (divMain,mbid) => {
        try {
                /*
				const session = await yamaApi.session()
                if(!session.auth) {
                        window.location.hash = '#login'
                }
                else {
					
				*/
				divMain.innerHTML = albumsView
				const divAlbumsResults = document.getElementById('divAlbumsResults')
				const albums = await yamaApi.getAlbums(mbid)
				if(albums.length != 0)
					divAlbumsResults.innerHTML = albumsResults(albums)
        } catch(err) {
                util.showAlert(JSON.stringify(err))
        }
}
