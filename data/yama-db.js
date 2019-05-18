'use strict'

const request = require('request')
const rp = require('request-promise')

class YamaDb {

	constructor(es) {
		this.uri = `http://${es.host}:${es.port}/${es.index}`
	} // localhost:9200/yama

	static init(es) {
		return new YamaDb(es)
	}
	createPlaylist(playlist) {  // cria grupo com {_id:xxx,name:nome,description:desc,musics:[]}
		playlist.musics = []
		playlist.duration = 0

		return rp.post({
			uri: `${this.uri}/playlist`,
			headers: { 'content-type': 'application/json' },
			json: true,
			body: playlist
		})
			.catch(error => {
				if (error.statusCode == 400)
					return Promise.reject({ 'statusCode': 400, 'message': 'bad request' })
				return Promise.reject({ 'statusCode': error.statusCode, 'message': 'unknown error' })
			})
			.then(body => ({ 'status': 'created', '_id': body._id }))
	}
	getPlaylists() {
		return rp.get({
			uri: `${this.uri}/playlist/_search`,
			headers: { 'content-type': 'application/json' },
			json: true
		})
			.catch(error => {
				if (error.statusCode == 400)
					return Promise.reject({ 'statusCode': 400, 'message': 'bad request' })
				if (error.statusCode == 404)
					return Promise.reject({ 'statusCode': 404, 'message': 'not found' })
				return Promise.reject({ 'statusCode': error.statusCode, 'message': 'unknown error' })
			})
			.then(body => body.hits.hits.map(p => parsePlaylists(p)))

	}
	getPlaylistInfo(mbid) {
		return rp.get({
			uri: `${this.uri}/playlist/${mbid}`,
			headers: { 'content-type': 'application/json' },
			json: true
		})
			.catch(error => {
				if (error.statusCode == 400)
					return Promise.reject({ 'statusCode': 400, 'message': 'bad request' })
				if (error.statusCode == 404)
					return Promise.reject({ 'statusCode': 404, 'message': 'not found' })
				return Promise.reject({ 'statusCode': error.statusCode, 'message': 'unknown error' })
			})
			.then(body => parsePlaylists(body))
		//http://localhost:9200/yama/playlist/ocKQPWoBFqJyB8idQUxg
	}
	editPlaylist(playlistId, pl) {  // edita grupo com {_id:xxx,name:nome,description:desc,musics:[]}
		return rp.put({
			uri: `${this.uri}/playlist/${playlistId}`,
			body: pl,
			json: true
		})
			.catch(error => {
				if (error.statusCode == 400)
					return Promise.reject({ 'statusCode': 400, 'message': 'bad request' })
				if (error.statusCode == 404)
					return Promise.reject({ 'statusCode': 404, 'message': 'not found' })
				if (error.statusCode == 409)
					return Promise.reject({ 'statusCode': 409, 'message': 'music already in playlist' })
				return Promise.reject({ 'statusCode': error.statusCode, 'message': 'unknown error' })
			})
			.then(body => ({ 'status': 'updated' }))
	}
	deletePlaylist(playlistId) {
		return rp.delete({
			uri: `${this.uri}/playlist/${playlistId}`,
			headers: { 'content-type': 'application/json' },
			json: true
		})
			.catch(error => {
				if (error.statusCode == 400)
					return Promise.reject({ 'statusCode': 400, 'message': 'bad request' })
				if (error.statusCode == 404)
					return Promise.reject({ 'statusCode': 404, 'message': 'Playlist Not Found' })
				return Promise.reject({ 'statusCode': error.statusCode, 'message': 'unknown error' })
			})
			.then(body => ({ 'status': 'deleted' }))
		//http://localhost:9200/yama/playlist/ocKQPWoBFqJyB8idQUxg
	}
}
function parsePlaylists(playlist) {
	let res = {
		'_id': playlist._id,
		'name': playlist._source.name,
		'description': playlist._source.description,
		'duration': playlist._source.duration,
		'musics': playlist._source.musics,
	}
	return res
}

module.exports = YamaDb