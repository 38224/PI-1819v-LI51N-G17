'use strict'

class LastFMMock{

    static init(token){
        return new LastFMMock()
    }
 

    getArtistByName(name,cb){
        if(!artists[name])
            cb({ 'code': 404, 'message': 'League does not exist'}, null)
        cb(null,artists[name])
    }

    getAlbumsByMbid(mbid, cb) {
		if(!albums[mbid])
			return cb({ 'code': 400, 'message': 'Invalid Mbid'}, null)
		const albums = albums[mbid]
		if(!albums)
			return cb({ 'code': 404, 'message': 'Album does not exist'}, null)
        cb(null, albums)
    }

    getTracksByMbid(mbid, cb) {
		if(!tracks[mbid])
			return cb({ 'code': 400, 'message': 'Invalid album Mbid'}, null)
		const albumTracks = tracks[mbid]
		if(!albumTracks)
			return cb({ 'code': 404, 'message': 'Team does not exist'})
        cb(null, tracks)
    }
}

module.exports= LastFMMock

const artists ={
    "Fat Freddy's Drop": {
            "name": "Fat Freddy's Drop",
            "listeners": "286462",
            "mbid": "d451395a-f768-432e-bb70-d38c32baf4cb",
            "url": "https://www.last.fm/music/Fat+Freddy%27s+Drop"
        },
        "Skream / Fat Freddy's Drop": {
            "name": "Skream / Fat Freddy's Drop",
            "listeners": "2841",
            "mbid": "",
            "url": "https://www.last.fm/music/Skream+%2F+Fat+Freddy%27s+Drop"
        },
        "Fat Freddy ' s Drop":{
            "name": "Fat Freddy ' s Drop",
            "listeners": "22",
            "mbid": "",
            "url": "https://www.last.fm/music/Fat+Freddy+%27+s+Drop"
        },
        "Skream (Tease Cay's Cray - Fat Freddy's Drop (Mala Remix)":{
            "name": "Skream (Tease Cay's Cray - Fat Freddy's Drop (Mala Remix)",
            "listeners": "1652",
            "mbid": "",
            "url": "https://www.last.fm/music/Skream+(Tease+Cay%27s+Cray+-+Fat+Freddy%27s+Drop+(Mala+Remix)"
        },
        
    }
    
    const album =
     {
       "d451395a-f768-432e-bb70-d38c32baf4cb": {
            "0b3d401e-aa43-3e84-9b9b-51e0b67bce8a":{
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
            "62626e7f-a10e-409c-a4fc-36deaf4f5a13":{
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