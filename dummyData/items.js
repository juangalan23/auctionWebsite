const db = require('../db/index.js');

const items = [
    {
        name: 'macbook',
        image_url: '',
        owner_id: 1,
        starting_price: 700,
        latest_bid_id: null,
        latest_bid: null,
        bids: []
    },
    {
        name: 'pencil sharpener',
        image_url: '',
        owner_id: 2,
        starting_price: 20,
        latest_bid_id: null,
        latest_bid: null,
        bids: []
    }
]

db.insertMultipleItemsToDB(items);