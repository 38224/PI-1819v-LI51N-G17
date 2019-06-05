'use strict'

const util = require('../util.js')
const yamaApi = require('../yama-api-requests.js')

module.exports = async (showNavbar) => {
    try {
        const session = await yamaApi.session()
        if(!session.auth) {
            window.location.hash = '#home'
        }
        else {
            await yamaApi.logout()
            await showNavbar()
            window.location.hash = '#home'
        }
    } catch(err) {
        util.showAlert(JSON.stringify(err.message))
    }
}