'use strict'

const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const alertView = Handlebars.compile('./../views/alert.hbs')

module.exports = {
    showAlert
}

function showAlert(message, div = "divAlerts", type = 'danger') {
    document
        .getElementById(div)
        .insertAdjacentHTML('beforeend', alertView({type, message}))
}