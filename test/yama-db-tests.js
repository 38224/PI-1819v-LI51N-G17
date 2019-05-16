'use strict'

const assert = require('assert')
const expect = require('chai').expect
const YamaDb = require('../data/yama-db')

describe('Yama-db Tests', () => {

    const es = {
        'host': 'localhost',
        'port': 9200,
        'index': 'yama'
    }
    let client

    beforeEach(() => {
        client = YamaDb.init(es)
    })

    it('init yamadb with the correct index uri', done => {
        assert.equal(client.uri, 'http://localhost:9200/yama')
        done()
    })

    it('create a playlist', done => {
        let pl = {
            "name": "g17 ",
            "description": "my list"
        }
        client.createPlaylist(pl).then(
            (data) => {
                if (data) {
                    expect(data).to.be.an('object').and.have.a.property('status', 'created')
                    expect(data).to.have.a.property('_id')
                    client.getPlaylistInfo(data._id)
                        .then(
                            (p) => {
                                if (data) {
                                    expect(p).to.be.an('object').and.have.a.property('name', pl.name)
                                    expect(p).to.have.a.property('description', pl.description)
                                    expect(p).to.have.a.property('duration', pl.duration)
                                    expect(p).to.have.a.property('musics').that.is.an('array').and.have.length(0);

                                }
                            })
                        .then(
                            (p) => {
                                client.deletePlaylist(data._id)
                                done()
                            })

                }
            })
    })

    it('delete a playlist', done => {
        let pl = {
            "name": "g17 ",
            "description": "my list"
        }
        client.createPlaylist(pl).then(
            (data) => {
                if (data) {
                    client.deletePlaylist(data._id).then(
                        (data) => {
                            if (data) {
                                expect(data).to.be.an('object').and.have.a.property('status', 'deleted')
                                done()
                            }
                        })
                }
            })
    })

    it('update a playlist', done => {
        let pl = {
            "name": "g17 ",
            "description": "my list"
        }
        client.createPlaylist(pl).then(
            (data) => {
                let _id = data._id
                if (data) {
                    client.editPlaylist(_id, pl).then(
                        (data) => {
                            if (data) {
                                expect(data).to.be.an('object').and.have.a.property('status', 'updated')
                                client.getPlaylistInfo(_id).then(
                                    (p) => {
                                        if (data) {
                                            expect(p).and.have.a.property('description', 'my list')
                                            client.deletePlaylist(_id).then((data) => { })
                                            done()
                                        }
                                    })
                            }
                        })
                }
            })
    })
})
