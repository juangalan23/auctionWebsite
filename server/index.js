const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const db = require('../db/Index.js');


const app = express()

app.use(express.static(__dirname + '/../react-client/dist'))
app.use(bodyParser.json())



const port = 3000
app.listen(port, function() {
    console.log('Listening on ' + port)
})