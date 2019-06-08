'use strict'

const request = require('request')
const rp = require('request-promise')

class LastFm {

	constructor(api_info) {
		this.API_KEY = api_info.API_KEY
		this.yama_api = api_info.yama_api
	}

	static init(api_info) {
		return new LastFm(api_info)
	}

	getArtistsByName(name) {

		return rp.get({
			uri: `${this.yama_api}?method=artist.search&artist=${name}&api_key=${this.API_KEY}&format=json`,
			json: true
		})
			.catch(error => {
				if (error.statusCode == 400)
					return Promise.reject({ 'statusCode': 400, 'message': 'bad request' })
				if (error.statusCode == 404)
					return Promise.reject({ 'statusCode': 404, 'message': 'not found' })
				return Promise.reject({ 'statusCode': error.statusCode, 'message': 'unknown error' })
			})
			.then(body => body.results.artistmatches.artist.map(a => parseArtists(a)))
	}

	getAlbumsByMbid(mbid) {

		return rp.get({
			uri: `${this.yama_api}?method=artist.gettopalbums&mbid=${mbid}&api_key=${this.API_KEY}&format=json`,
			json: true
		})
			.catch(error => {
				if (error.statusCode == 400)
					return Promise.reject({ 'statusCode': 400, 'message': 'bad request' })
				if (error.statusCode == 404)
					return Promise.reject({ 'statusCode': 404, 'message': 'not found' })
				return Promise.reject({ 'statusCode': error.statusCode, 'message': 'unknown error' })
			})
			.then(body => body.topalbums.album.filter(album => album.mbid != null).map(a => parseAlbums(a)))
	}

	getTracksByMbid(mbid) {
		return rp.get({
			uri: `${this.yama_api}?method=album.getinfo&api_key=${this.API_KEY}&mbid=${mbid}&format=json`,
			json: true
		})
			.catch(error => {
				if (error.statusCode == 400)
					return Promise.reject({ 'statusCode': 400, 'message': 'bad request' })
				if (error.statusCode == 404)
					return Promise.reject({ 'statusCode': 404, 'message': 'not found' })
				return Promise.reject({ 'statusCode': error.statusCode, 'message': 'unknown error' })
			})
			.then(body => parseTracks(body.album))
	}
}
function parseArtists(artist) {
	let res = {
		'name': artist.name,
		"listeners": artist.listeners,
		"mbid": artist.mbid,
		"url": artist.url
		//nao interessa as imagens?
	}
	return res
}
function parseAlbums(album) {
	let res = {
		'name': album.name,
		"playcount": album.playcount,
		"mbid": album.mbid,
		"url": album.url,
		"artist": album.artist
		//nao interessa as imagens?
	}
	return res
}
function parseTracks(album) {
	let res = {
		'name': album.name,
		"artist": album.artist,
		"mbid": album.mbid,
		"url": album.url,
		"listeners": album.listeners,
		"playcount": album.playcount,
		"tracks": album.tracks,
		"wiki": album.wiki
		//nao interessa as imagens nem tags?
	}
	return res
}

module.exports = LastFm

