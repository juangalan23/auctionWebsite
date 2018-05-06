const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');

const db = mongoose.connection;

db.on('error', (err) => {
    console.log('error in mongoose connection ', err);
})

db.once('open', ()=> {
    console.log('connected to DB')
})

const itemSchema = mongoose.Schema({
    item_id: {type: Number, unique: true},
    name: String,
    image_url: String,
    owner_id: Number,
    starting_price: Number,
    latest_bid_id: Number,
    latest_bid: Number,
    bids: {}
  });

const Item = mongoose.model('Item', itemSchema);

module.exports = db;