'use strict'

require('./../../node_modules/bootstrap/dist/css/bootstrap.css')
require('./../../node_modules/bootstrap/dist/js/bootstrap.js')
const util = require('./util')
const yamaApi = require('./yama-api-requests.js')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const mainView = require('./../views/main.html')
const navbarHB = require('./../views/navbar.hbs')
console.log(Handlebars)
const navbarView = Handlebars.compile('adssd')

const home = require('./home')
const playlist = require('./playlists/playlist.js') 
const playlists = require('./playlists/playlists.js')
/*
const login = require('./auth/login')
const signup = require('./auth/signup')
const logout = require('./auth/logout')
*/


document.body.innerHTML = mainView
const divMain = document.getElementById('divMain') 
const Router = require('./../../utils/router')
const router = new Router()

router.get('#home', () => home(divMain))
router.get('#playlist', () => playlist(showNavbar))
router.get('#playlists', () => playlists(showNavbar))
/*
router.get('#login', () => login(divMain, showNavbar))
router.get('#signup', () => signup(divMain, showNavbar))
router.get('#logout', () => logout(showNavbar)) 
*/


router.get('', () => home(divMain))
router.use(() => divMain.innerHTML = 'Recurso não encontrado')

showNavbar()
    .then(() => {
        window.onload = showView
        window.onhashchange = showView
        showView()
    })

async function showNavbar() {

    document
        .getElementById('divNavbar')
        .innerHTML = navbarView()//await yamaApi.session())
}

function showView() {
    const path = window.location.hash 
    router.router(path)
    cleanDivAlerts()
    updateNav(path)
}

function cleanDivAlerts(){
    document.getElementById('divAlerts')
        .innerHTML = ""
}

function updateNav(path){
    // Deactivate previous anchor
    const prev = document.querySelector('a.active')
    if(prev) prev.classList.remove('active')

    // Activate curr anchor in navigation bar
    const option = document.getElementById('nav' + path)
    if(option) option.classList.add('active')
}