const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const mocha = require('mocha')
const moment = require('moment');

const dummyItems = require('../dummyData/items.js').slice();
const dummyUsers = require('../dummyData/users.js');
const timesToAdd = [15, 30, 60];

const addExpiryTimes = function() {
    for( var i = 0; i< dummyItems.length; i++) {
        var d = new Date()
        var v = new Date()
        v.setMinutes(d.getMinutes() + timesToAdd[i])
        dummyItems[i].expiringTime = v
    }
}

const { insertMultipleItemsToDB, insertMultipleUsersToDB, retrieveAllItems, retrieveAllUsers } = require('../db/index.js');

describe('DB Tests ', function() {
    describe('function that adds expiration time ',function() {
        it('should add a different time to each time', function(done) {
            addExpiryTimes()
            if (( (new Date(dummyItems[1].expiringTime).getMinutes()) - (new Date(dummyItems[0].expiringTime).getMinutes())  ) 
                === (timesToAdd[1].expiringTime -  timesToAdd[0].expiringTime)) {
                done() 
            } else {
                done('did not properly add the expiration times to each item')
            }
        })
    })
    describe('insert and retrieve items and users in DB ', function() {
        it('should save the items into DB ', function(done) {
            return insertMultipleItemsToDB(dummyItems, function(data) {
                if (data.length === dummyItems.length) {
                    done()
                } else {
                    done('did not input correct number of items')
                }
             })
        })
        it ('should insert multiple users into DB ', function(done) {
            return insertMultipleUsersToDB(dummyUsers, function(data) {
                if (data.length === dummyUsers.length) {
                    done()
                } else {
                    done('did not input correct number of items')
                }
            })
        })
        it ('should retrieve all items in items collection ', function(done) {
            return retrieveAllItems(function(data) {
                console.log('data')
                if(data.length === dummyItems.length) {
                    done()
                } else {
                    done('did not retrieve all items from db')
                }
            })
        })
        it ('should retrieve all users in users collection ', function(done) {
            return retrieveAllUsers(function(data) {
                console.log('data')
                if(data.length === dummyUsers.length) {
                    done()
                } else {
                    done('did not retrieve all users from db')
                }
            })
        })
    })
})