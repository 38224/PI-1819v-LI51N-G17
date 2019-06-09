'use strict'

const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const alertHB = require('./../views/alert.hbs').default


module.exports = {
    showAlert
}

function showAlert(message, div = "divAlerts", type = 'danger') {
	const alertView = Handlebars.compile(alertHB)
    document
        .getElementById(div)
        .insertAdjacentHTML('beforeend', alertView({type, message}))
}