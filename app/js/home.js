'use strict'

const homeView = require('./../views/home.html')

module.exports = (divMain) => {
    divMain.innerHTML = homeView
}