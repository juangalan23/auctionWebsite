const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const mongoDB = require('../db/index.js');

const app = express()

app.use(express.static(__dirname + '/../react-client/dist'))
app.use(bodyParser.json())

/* ****** ROUTES ****** */

app.get('/allItems', function(req, res) {
    mongoDB.retrieveAllItems((data)=>{
        res.send(data)
    })
})

app.post('/newBid', function(req, res) {
    let bidBody = req.body;
    mongoDB.submitNewBid(bidBody, (data)=> {
        res.send(data)
    })
})

app.post('/verifyUser', (req, res)=> {
    let userInfo = req.body;
    mongoDB.checkUser(userInfo, (data)=> {
        res.send(data)
    })
})

const port = 3000
app.listen(port, function() {
    console.log('Listening on ' + port)
})