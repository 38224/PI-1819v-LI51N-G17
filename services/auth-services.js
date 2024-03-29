'use strict'

class Auth {

    constructor(userDb) {
        this.userDb = userDb
    }

    static init(userDb) {
        return new Auth(userDb)
    }

    createUser(fullname, username, password) { 
        return this.userDb
            .getUserByUsername(username)
            .catch(err => { throw err })
            .then(user => { throw { 'statusCode': 400, 'message': 'Já existe um utilizador com esse username'} })
            .catch(err => {
                if(err.statusCode == 404)
                    return this.userDb.postUser({ fullname, username, password })
                else throw err
            })
    }

    getUser(userId) {
        return this.userDb.getUserById(userId)
    }
    
    authenticate(username, password) {
        return this.userDb
            .getUserByUsername(username)
            .then(async (user) => {
                if(user.password != password)
                    throw { 'statusCode': 401, 'message': 'Credenciais inválidas' }
                return { '_id': user._id }
            })
    }
}

module.exports = Auth