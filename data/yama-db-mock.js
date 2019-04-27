'use strict'

class YamaDbMock {

    static init() {
        return new YamaDbMock
    }

	createPlaylist(playlist,cb) { 
		const _id = idplaylist
		const pl = {
			'_id':_id,
			'name':playlist.name,
			'description':playlist.description,
			'duration': 0, 
			'musics':[]
		}
		playlists[_id] = pl
		cb(null, { 'status': 'created', '_id': _id})
	}

	editPlaylist(playlistId,body,cb) {  
		const pl = playlists[idplaylist]
		if(!pl)
            return cb({ 'code': 404, 'message': 'Playlist does not exist'})
		playlists[playlistId] = body
        cb(null, { 'status': 'updated' }) 
	}
	
	getPlaylists(cb){
		cb(null, playlists)
	}
	
    getPlaylistInfo(mbid,cb) {
		const pl = playlists[idplaylist]
        if(!pl)
            return cb({ 'code': 404, 'message': 'Playlist does not exist'})
        cb(null, playlists[mbid])
		
    }
	deletePlaylist(playlistId, cb) {
        const pl = playlists[idplaylist]
        if(!pl)
            return cb({ 'code': 404, 'message': 'Playlist does not exist'})
        delete playlists[playlistId]
        cb(null, { 'status': 'deleted' })
    }
}

module.exports = YamaDbMock

let idplaylist = 1001

const playlists = {
	1000:{
    "_id": 1000,
    "name": "g17 ",
    "description": "my list",
    "duration": 437,
    "musics": [
        {
            "name": "Ernie",
            "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Ernie",
            "duration": 437,
            "artist": {
                "name": "Fat Freddy's Drop",
                "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
            }
        }
    ]
	},
	1001:{
    "_id": 1001,
    "name": "g17 ",
    "description": "my list",
    "duration": 0,
    "musics": []
	}
}