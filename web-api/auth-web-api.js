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
    //app.post('/api/auth/login', login)
    //app.post('/api/auth/logout', logout)
    app.post('/api/auth/signup', signup)

    function getSession(req, resp, next) {

        console.log("sessioning")
        const fullname = req.isAuthenticated() ? req.user.fullname : undefined
        resp.json({
            'auth': req.isAuthenticated(),
            'fullname': fullname
        })
    }  
    function signup(req, resp, next) {
        console.log("signing up")
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


}