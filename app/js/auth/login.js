'use strict'

const util = require('../util.js')
const yamaApi = require('../yama-api-requests.js')
const loginView = require('./../../views/login.html')

module.exports = async (divMain, getAuthAndInsertNavbar) => {
    try {
        const session = await yamaApi.session()
        if(session.auth) {
            window.location.hash = '#home'
        }
        else {
            divMain.innerHTML = loginView
            const inputUsername = document.getElementById('inputUsername')
            const inputPassword = document.getElementById('inputPassword')
            document
                .getElementById('buttonLogin')
                .addEventListener('click', ev => {
                    ev.preventDefault()
					alert("a fazer login..")
                    if(!inputUsername.value || !inputPassword.value) 
                        return util.showAlert('preencha todos os campos')
                    yamaApi
                        .login(inputUsername.value, inputPassword.value)
                        .then(async () => await getAuthAndInsertNavbar())
                        .then(() => window.location.hash = '#playlists')
                        .catch(err => util.showAlert("credenciais erradas"))
                })
        }
    } catch(err) {
        util.showAlert(JSON.stringify(err))
    }
}