'use strict'

const passport = require('passport')

module.exports = (app, authService) => {

    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((userId, done) => authService
        .getUser(userId)
        .then(user => done(null, user))
        .catch(err => done(err))
    )
    app.use(passport.initialize())
    app.use(passport.session())
 
    app.get('/api/auth/session', getSession)
    app.post('/api/auth/signup', signup)
    app.post('/api/auth/login', login)
    app.post('/api/auth/logout', logout)

    function getSession(req, resp, next) {
        const fullname = req.isAuthenticated() ? req.user.fullname : undefined
        resp.json({
            'auth': req.isAuthenticated(),
            'fullname': fullname
        })
    }

    function signup(req, resp, next){
        const fullname = req.body.fullname
        const username = req.body.username
        const password = req.body.password
        authService
            .createUser(fullname, username, password)
            .then(user => {
                req.login(user, err => {
                    if (err)
                        return next(err)
                    resp.status(201)
                    resp.json(user)
                })
            })
            .catch(err => next(err))
    }

    function login(req, resp, next) {
        authService
            .authenticate(req.body.username, req.body.password)
            .then(user => {
                req.login(user, err => {
                    if(err) next(err)
                    else resp.json(user)
                })
            })
            .catch(err => next(err))
    }

    async function logout(req, resp, next) {
        req.logout()
        resp.json({ status: 'loged out' })
    } 
}