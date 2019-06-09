'use strict'

const util = require('../util.js')
const yamaApi = require('../yama-api-requests.js')
const signupView = require('./../../views/auth/signup.html')

module.exports = async (divMain, getAuthAndInsertNavbar) => {
    try {
		
        const session = await yamaApi.session()
        if(session && session.auth) {
            window.location.hash = '#home'
        }
        else {
			
            divMain.innerHTML = signupView
            const inputFullname = document.getElementById('inputFullname')
            const inputUsername = document.getElementById('inputUsername')
            const inputPassword = document.getElementById('inputPassword')
            document
                .getElementById('buttonSignUp')
                .addEventListener('click', ev => {
                    ev.preventDefault()
                    if(! inputFullname.value || !inputUsername.value || !inputPassword.value) 
                        return util.showAlert('preencha todos os campos')
                    yamaApi
                        .signup(inputFullname.value, inputUsername.value, inputPassword.value)
                        .then(async () => await getAuthAndInsertNavbar())
                        .then(() => window.location.hash = '#playlists')
                        .catch(err => util.showAlert("Já existe esse utilizador"))
                })
				
        }
		
    } catch(err) {
        util.showAlert(JSON.stringify(err))
    }
}