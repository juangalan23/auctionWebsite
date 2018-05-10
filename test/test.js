const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const mocha = require('mocha')


const dummyItems = require('../dummyData/items.js');

const { insertMultipleItemsToDB } = require('../db/index.js');

describe('DB Tests ', function() {
    describe('insert multiple items into DB ', function() {
        it('should save the items into DB ', function(done) {
            return insertMultipleItemsToDB(dummyItems)
            .then( ()=> {
                console.log('are we getting here   ')
            })
        })
    })
})