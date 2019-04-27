'use strict'

class ServicesMock {

    constructor(lastfmData, yamaDb) {
    }

    static init(lastfmData, yamaDb) {
        return new ServicesMock(lastfmData, yamaDb)
    }
    ///////////////////// lastfmdata start ///////////////////
    getArtistsByName(name, cb) {

        if (!artists[name])
            cb({ 'code': 404, 'message': 'artist does not exist' }, null)
        const result = []
        Object.keys(artists).forEach((key) => { result.push(artists[key]) })
        cb(null, result)
    }

    getAlbumsByMbid(mbid, cb) { 
        if (!albums[mbid])
            return cb({ 'code': 400, 'message': 'Invalid Artist Mbid' }, null)
        const albumsResult = []
        Object.keys(albums[mbid]).forEach((key) => { albumsResult.push(albums[mbid][key]) })
        cb(null, albumsResult)
    }

    getTracksByMbid(mbid, cb) {
        if (!tracks[mbid])
            return cb({ 'code': 400, 'message': 'Invalid album Mbid' }, null)
        const albumTracks = tracks[mbid]
        cb(null, albumTracks)
    }

    ///////////////////// lastfmdata end ///////////////////
    ///////////////////// db start ///////////////////
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
		if(body.name)  pl.name = body.name
		if(body.description) pl.description = body.description
		playlists[playlistId] = pl  
        cb(null, { 'status': 'updated' }) 
	}
	  
	getPlaylists(cb){
		cb(null, playlists)
	}
	
    getPlaylistInfo(mbid,cb) {
		const pl = playlists[idplaylist]
        if(!pl)
            return cb({ 'code': 404, 'message': 'playlist does not exist'})
        cb(null, playlists[mbid])
		
    }
	deletePlaylist(playlistId, cb) {
        const pl = playlists[idplaylist]
        if(!pl)
            return cb({ 'code': 404, 'message': 'Playlist does not exist'})
        delete playlists[playlistId]
        cb(null, { 'status': 'deleted' })
    }
    ///////////////////// db end ///////////////////
    addMusicToPlaylist(playlistId, albumId, musicName, cb) {
		
        let pl = playlists[playlistId]
        let ts = tracks[albumId]
        if (!pl)
            return cb({ 'code': 404, 'message': 'playlist does not exist' })
        if (!ts)
            return cb({ 'code': 404, 'message': 'album does not exist' })

        const idx = ts.tracks.track.findIndex(track => track.name == musicName)
        if (idx < 0)
            return cb({ 'code': 404, 'message': 'album does not contain that music' }, null)
        const idx2 = pl.musics.findIndex(track => track.url == ts.tracks.track[idx].url)
        if (idx2 >= 0)
            return cb({ 'code': 409, 'message': 'music alredy inserted in playlist' }, null)
		const dur = parseInt(ts.tracks.track[idx].duration)
        const music = {
            'name': ts.tracks.track[idx].name,
            'url': ts.tracks.track[idx].url,
            'duration': dur,
            'artist': ts.tracks.track[idx].artist
        }
        pl.duration = pl.duration + dur // add the duration time of the song
        pl.musics.push(music)
        playlists[playlistId] = pl
        cb(null, { status: 'updated' })
    }

    deleteMusicFromPlaylist(playlistId, musicName, cb) {
        let pl = playlists[playlistId]
        if (!pl)
            return cb({ 'code': 404, 'message': 'playlist does not exist' })
        const idx = pl.musics.findIndex(track => track.name == musicName)
        if (idx < 0)
            return cb({ 'code': 400, 'message': 'playlist does not contain that music' })

        const dur = pl.musics[idx].duration
        pl.duration = parseInt(pl.duration - dur) // extract the duration time of the song removed
        pl.musics.splice(idx, 1) // removes 1 element at index idx
        playlists[playlistId] = pl
        cb(null, { 'status': 'deleted' })
    }
}

let idplaylist = 1001

const playlists = {
    1000: {
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
    1001: {
        "_id": 1001,
        "name": "g17 ",
        "description": "my list",
        "duration": 0,
        "musics": []
    }
}

const artists = {
    "Fat%20Freddy%27s%20Drop": {
        "name": "Fat Freddy's Drop",
        "listeners": "286462",
        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
    },
    "Skream%20%2F%20Fat%20Freddy%27s%20Drop": {
        "name": "Skream / Fat Freddy's Drop",
        "listeners": "2841",
        "mbid": "",
        "url": "https://www.last.fm/music/Skream+%2F+Fat+Freddy%27s+Drop"
    },
    "Fat%20Freddy%20%27%20s%20Drop": {
        "name": "Fat Freddy ' s Drop",
        "listeners": "22",
        "mbid": "",
        "url": "https://www.last.fm/music/Fat+Freddy+%27+s+Drop"
    },
    "Skream%20%28Tease%20Cay%27s%20Cray%20%2D%20Fat%20Freddy%27s%20Drop%20%28Mala%20Remix%29": {
        "name": "Skream (Tease Cay's Cray - Fat Freddy's Drop (Mala Remix)",
        "listeners": "1652",
        "mbid": "",
        "url": "https://www.last.fm/music/Skream+(Tease+Cay%27s+Cray+-+Fat+Freddy%27s+Drop+(Mala+Remix)"
    }
}

const albums = {
    "d451395a-f768-432e-bb70-d38c32baf4cb": {
        "0b3d401e-aa43-3e84-9b9b-51e0b67bce8a": {
            "name": "Based on a True Story",
            "playcount": 2867723,
            "mbid": "0b3d401e-aa43-3e84-9b9b-51e0b67bce8a",
            "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/Based+on+a+True+Story",
            "artist": {
                "name": "Fat Freddy's Drop",
                "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
            }
        },
        "62626e7f-a10e-409c-a4fc-36deaf4f5a13": {
            "name": "Blackbird",
            "playcount": 610147,
            "mbid": "62626e7f-a10e-409c-a4fc-36deaf4f5a13",
            "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/Blackbird",
            "artist": {
                "name": "Fat Freddy's Drop",
                "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
            }
        }
    }
}


const tracks = {
    "0b3d401e-aa43-3e84-9b9b-51e0b67bce8a":
    {
        "name": "Based on a True Story",
        "artist": "Fat Freddy's Drop",
        "mbid": "0b3d401e-aa43-3e84-9b9b-51e0b67bce8a",
        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/Based+on+a+True+Story",
        "listeners": "189021",
        "playcount": "2867723",
        "tracks": {
            "track": [
                {
                    "name": "Ernie",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Ernie",
                    "duration": "437",
                    "@attr": {
                        "rank": "1"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "Cay's Crays",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Cay%27s+Crays",
                    "duration": "427",
                    "@attr": {
                        "rank": "2"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "This Room",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/This+Room",
                    "duration": "299",
                    "@attr": {
                        "rank": "3"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "Ray Ray",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Ray+Ray",
                    "duration": "458",
                    "@attr": {
                        "rank": "4"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "Dark Days",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Dark+Days",
                    "duration": "400",
                    "@attr": {
                        "rank": "5"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "Flashback",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Flashback",
                    "duration": "391",
                    "@attr": {
                        "rank": "6"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "Roady",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Roady",
                    "duration": "430",
                    "@attr": {
                        "rank": "7"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "Wandering Eye",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Wandering+Eye",
                    "duration": "581",
                    "@attr": {
                        "rank": "8"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "Del Fuego",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Del+Fuego",
                    "duration": "324",
                    "@attr": {
                        "rank": "9"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                },
                {
                    "name": "Hope",
                    "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop/_/Hope",
                    "duration": "439",
                    "@attr": {
                        "rank": "10"
                    },
                    "streamable": {
                        "#text": "0",
                        "fulltrack": "0"
                    },
                    "artist": {
                        "name": "Fat Freddy's Drop",
                        "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
                        "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
                    }
                }
            ]
        }
    }
}

module.exports = ServicesMock

