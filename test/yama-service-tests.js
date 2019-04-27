'use strict'

const assert = require('assert')
const lastFmDataMock = require('../data/lastfm-data-mock').init('dummy')
const yamaDbMock = require('../data/yama-db-mock').init()
const yamaServices = require('../services/yama-services-mock').init(lastFmDataMock, yamaDbMock) 

describe('Test Yama-Services', () => {

    it('get artists by name', done => {
        yamaServices.getArtistsByName('Fat%20Freddy%27s%20Drop',(err, data) => {
            assert.equal(data[0].name, "Fat Freddy's Drop")
            assert.equal(data[0].listeners, 286462)
            done()
        })
    })
	it('get albums by mbid', done => {
	yamaServices.getAlbumsByMbid('d451395a-f768-432e-bb70-d38c32baf4cb',(err, data) => {
		assert.equal(data[0].name, "Based on a True Story") 
		assert.equal(data[0].mbid, '0b3d401e-aa43-3e84-9b9b-51e0b67bce8a')
		assert.equal(data[0].url, 'https://www.last.fm/music/Fat+Freddy%27s+Drop/Based+on+a+True+Story')
		done()
        })
    })
	
	it('get tracks by mbid', done => {
	yamaServices.getTracksByMbid('0b3d401e-aa43-3e84-9b9b-51e0b67bce8a',(err, data) => {
		const trs = data.tracks.track
		assert.equal(trs[0].name, "Ernie") 
		assert.equal(trs[0].url, "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Ernie") 
		assert.equal(trs[0].duration, "437") 
		done()
        })
    })
	it('create Playlist', done => {
		const body = {
			"name": "g17 ",
			"description": "my list"
		} 
		yamaServices.createPlaylist(body,(err, data) => { 
			assert.equal(data.status, "created")
			assert.equal(data._id, "1001")  			
			done()
		})
    })
	it('Edit Playlist', done => {
		const body = {
			"name": "lista999",
			"description": "minhalista999"
		}
		yamaServices.editPlaylist(1001,body,(err, data) => { 
			assert.equal(data.status, "updated")  			
			done()
		})
    })
	it('Get Playlists', done => {
		yamaServices.getPlaylists((err, data) => { 
		
			assert.equal(data[1000]._id , 1000)
			assert.equal(data[1000].name , "g17 ")
			assert.equal(data[1000].description , "my list") 
			done()
		})
    })
	it('Get Playlist Info', done => {
		yamaServices.getPlaylistInfo('1001',(err, data) => {  
			assert.equal(data.name , "lista999")
			assert.equal(data.description , "minhalista999")
			done()
		})
    })
	it('Delete Playlist', done => {
		yamaServices.deletePlaylist('1001',(err, data) => {  
			assert.equal(data.status, "deleted")  
			done()
		})
    })
 
	it('Delete Music from Playlist', done => {
		yamaServices.deleteMusicFromPlaylist('1000','Ernie',(err, data) => { 
			assert.equal(data.status, "deleted")  
			done()
		})
    })
	it('Add Music to Playlist', done => {
		yamaServices.addMusicToPlaylist('1000','0b3d401e-aa43-3e84-9b9b-51e0b67bce8a','Ernie',(err, data) => { 
			assert.equal(data.status, "updated")  
			done()
		})
    })
})
