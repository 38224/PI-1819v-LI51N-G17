'use strict'

module.exports = {
    signup,
    login,
    session,
    logout,
    getAllPlaylists
}

const baseAuthUrl = 'http://localhost:3000/api/auth'
// talvez seja preciso usar para musics?
const basePlaylistsUrl = 'http://localhost:3000/api/playlists'

function signup(fullname, username, password){
    const options = {
        method: 'POST',
        body: JSON.stringify({
            'fullname': fullname,
            'username': username,
            'password': password
        }),
        headers: { 'Content-Type': 'application/json' }
    }
    return fetchJSON(`${baseAuthUrl}/signup`, options)
}

function login(username, password){
    const options = {
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'password': password
        }),
        headers: { 'Content-Type': 'application/json' }
    }
    return fetchJSON(`${baseAuthUrl}/login`, options)
}

function session(){
    return fetchJSON(`${baseAuthUrl}/session`)
}

function logout(){
    return fetchJSON(`${baseAuthUrl}/logout`, { method: 'POST' })
}

function getAlbumMusics(mbid) {
    return fetchJSON(`${baseLeaguesUrl}/albums/${mbid}/tracks`)
}

function getAllPlaylists() {
    return fetchJSON(`${basePlaylistsUrl}`)
}

function getPlaylist(id) {
    return fetchJSON(`${basePlaylistsUrl}/${id}`)
}
/*
function createPlaylist(name, description) {
	
    const options = {
        method: 'POST',
        body: JSON.stringify({
                'name': name,
                'description': description
        }),
        headers: { 'Content-Type': 'application/json' }
    }
    return fetchJSON(`${basePlaylistsUrl}`, options)
}
*/

async function fetchJSON(url, options = { method: 'GET', credentials: 'same-origin' }) {
    const resp = await fetch(url, options)
    const body = await resp.json()
    if(resp.status < 200 || resp.status >= 300) throw body
    else return body
}