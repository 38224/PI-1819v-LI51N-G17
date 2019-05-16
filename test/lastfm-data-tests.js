'use strict'

const api_info = {
    'API_KEY': 'f72aedc9562cd94f698840409f292395',
    'yama_api': 'http://ws.audioscrobbler.com/2.0/',
}
const assert = require('assert')
const expect = require('chai').expect
const lastFMData = require('../data/lastfm-data').init(api_info)

describe('LastFm - data Tests', () => {

    it('should get all artist with ffd', done => {
        lastFMData.getArtistsByName('Fat Freddy s Drop').then(
            (data) => {
                if (data) {
                    expect(data)
                        .to.be.an('array')

                    assert.equal(data[0].name, "Fat Freddy's Drop")
                    assert.equal(data[0].mbid, "d451395a-f768-432e-bb70-d38c32baf4cb")
                    assert.equal(data[1].name, "Skream / Fat Freddy's Drop")
                    assert.equal(data[1].mbid, "")

                }
            })
        done()
    })

    it('should get a albums of an artist', done => {
        lastFMData.getAlbumsByMbid("d451395a-f768-432e-bb70-d38c32baf4cb").then((data) => {
            if (data) {
                expect(data)
                    .to.be.an('array')
                    .and.to.have.length(8)
                assert.equal(data[0].name, "Based on a True Story")
                assert.equal(data[1].name, "Blackbird")
                assert.equal(data[2].name, "Dr. Boondigga & The Big Bw")

            }
        })
        done();
    })

    it('should get tracks from an album', done => {
        lastFMData.getTracksByMbid("0b3d401e-aa43-3e84-9b9b-51e0b67bce8a").then(
            (data) => {
                if (data) {
                    expect(data)
                        .to.be.an('object')
                    assert.equal(data.tracks.track[0].name, 'Ernie')
                    assert.equal(data.tracks.track[0].duration, '437')
                    assert.equal(data.tracks.track[1].name, "Cay's Crays")
                    assert.equal(data.tracks.track[1].duration, '427')

                }
            })
        done()
    })
})