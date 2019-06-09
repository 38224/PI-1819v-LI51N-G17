'use strict'

const rp = require('request-promise')

class UserDb {
 
    constructor(es) {
        this.usersRefresh = `http://${es.host}:${es.port}/users/_refresh`
        this.usersUrl = `http://${es.host}:${es.port}/${es.index}`
    }

    static init(es) {
        return new UserDb(es)
    }

    postUser(user) {
        const options = {
            'uri': this.usersUrl,
            'json': true,
            'body': user
        }
        return rp 
            .post(options)
            .then(resp => {
                return Promise.all([
                    resp._id,
                    rp.post(this.usersRefresh)
                ])
            })
            .then(([resp, data]) => {
                return { 'status': 'created', '_id': resp }
            })
            .catch(handleError)    
    }

    getUserById(userId) {
        return rp
            .get(`${this.usersUrl}/${userId}`)
            .then(body => 
                JSON.parse(body))
            .then(data => ({
                '_id': data._id,
                'fullname': data._source.fullname,
                'username': data._source.username
            }))
            .catch(handleError)            
    }

    getUserByUsername(username){
        return rp 
            .get(`${this.usersUrl}/_search?q=username:${username}`)
            .then(body => JSON.parse(body))
            .then(async (data) => {
                if(data.hits.hits.length == 0)
                    throw { 'statusCode': 404, 'message': 'Utilizador não existe' }
				const first = data.hits.hits[0]
                const res = first._source
                res._id = first._id
                return res
            })
            .catch(handleError)
    }
}

async function handleError(err){
    if(err.statusCode == 404)
        throw { 'statusCode': err.statusCode, 'message': 'O utilizador não existe' }
    throw { 'statusCode': err.statusCode, 'message': err.message}
}
 
module.exports = UserDb