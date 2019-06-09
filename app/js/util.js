'use strict'

const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const alertView = Handlebars.compile(require('./../views/alert.hbs').default)

module.exports = {
    showAlert
}

function showAlert(message, type = 'danger') {
    document
        .getElementById('divAlerts')
        .insertAdjacentHTML('beforeend', alertView({type, message}))
}