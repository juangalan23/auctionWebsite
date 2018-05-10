const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const MongoClient = require('../db/Index.js');


const app = express()

app.use(express.static(__dirname + '/../react-client/dist'))
app.use(bodyParser.json())

/* ****** ROUTES ****** */

//get all items from the list 
    // TBD: do we want to sort in the front or in the back-end,
    // should this be handled in the main get request


// post new bid to an item
    // should take in item id
    // new bid amount 
    // on the front-end, we should only allow numbers that are bigger than the highest bid
    




const port = 3000
app.listen(port, function() {
    console.log('Listening on ' + port)
})