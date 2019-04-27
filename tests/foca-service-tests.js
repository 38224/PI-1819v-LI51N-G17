'use strict'

const assert = require('assert')
const FootballDataMock = require('../data/football-data-mock').init('')
const focaDbMock = require('../data/foca-db-mock').init()
const focaService = require('../services/foca-service-mock').init(FootballDataMock, focaDbMock)
//const focaService = require('../services/foca-service').init(FootballDataMock, focaDbMock)

describe('Test Foca-Services', () => {

    it('should get all leagues', done => {
        focaService.getLeagues((err, data) => {
            assert.equal(data[0].id, 2006)
            assert.equal(data[1].id, 2025)
            done()
        })
    })

    it('should get teams of a league', done => {
        focaService.getLeagueTeams(2006, (err, data) => {
            assert.equal(data[0].id, 496)
            assert.equal(data[1].id, 498)
            done()
        })
    })

    it('should get group', done => {
        focaService.getGroup(222, (err, data) => {
            assert.equal(data.name, 'group2')
            assert.equal(data.description, 'before')
            assert.deepEqual(data.teams, [])
            done()
        })
    })

    it('should create new group', done => {
        const group = {
            'name': 'newGroup',
            'description': 'new'
        }
        focaService.createGroup(group, (err, data) => {
            assert.equal(data.status, 'created')
            assert.equal(data._id, 1)
            done()
        })
    })

    it('should update only groups name, keeping its teams', done => {
        const group = {
            'name': 'newGroup'
        }
        focaService.updateGroup(123, group, (err, data) => {
            assert.equal(data.status, 'updated')
            focaService.getGroup(123, (err, g) => {
                assert.equal(g.name, 'newGroup')
                assert.equal(g.description, 'favorites')
                assert.equal(g.teams[0].id, 496)
                done()
            })
        })
    })

    it('should update groups name and description, keeping its teams', done => {
        const group = {
            'name': 'newGroup',
            'description': 'new'
        }
        focaService.updateGroup(123, group, (err, data) => {
            assert.equal(data.status, 'updated')
            focaService.getGroup(123, (err, g) => {
                assert.equal(g.name, 'newGroup')
                assert.equal(g.description, 'new')
                assert.equal(g.teams[0].id, 496)
                done()
            })
        })
    })

    it('should delete group', done => {
        focaService.deleteGroup(222, (err, data) => {
            assert.equal(data.status, 'deleted')
            focaService.getGroup(222, (err, g) => {
                assert.equal(g, undefined)
                done()
            })
        })
    })

    it('should not add team to group because it already has it', done => {
        focaService.addTeamToGroup(123, 496, (err, data) => {
            assert.equal(err.code, 400)
            assert.equal(err.message, 'Group already contains that team')
            done()
        })
    })

    it('should add team to group', done => {
        focaService.addTeamToGroup(123, 498, (err, data) => {
            assert.equal(data.status, 'updated')
            focaService.getGroup(123, (err, group) => {
                assert.equal(group.teams[0].id, 496)
                assert.equal(group.teams[1].id, 498)
                done()
            })
        })
    })

    it('should get games of group teams between two dates, ordered by date', done => {
        focaService.getGroupGamesBetweenDates(123, '2018-08-10', '2018-08-20', (err, data) => {
            assert.equal(data.length, 4)
            assert.equal(data[0].utcDate, "2018-08-12T15:00:00Z") //496
            assert.equal(data[1].utcDate, "2018-08-12T17:30:00Z") //498
            assert.equal(data[2].utcDate, "2018-08-18T20:00:00Z") //498
            assert.equal(data[3].utcDate, "2018-08-19T15:00:00Z") //496
            done()
        })
    })

    it('should remove team from group', done => {
        focaService.removeTeamFromGroup(123, 496, (err, data) => {
            assert.equal(data.status, 'deleted')
            focaService.getGroup(123, (err, group) => {
                assert.equal(group.teams.length, 1)
                assert.equal(group.teams[0].id, 498)
                done()
            })
        })
    })

    it('should not be able to remove team because group does not have it', done => {
        focaService.removeTeamFromGroup(123, 987, (err, data) => {
            assert.equal(err.code, 400)
            assert.equal(err.message, 'Group does not contain that team')
            done()
        })
    })
})