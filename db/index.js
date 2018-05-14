const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');

const db = mongoose.connection;

db.on('error', (err) => {
    console.log('error in mongoose connection ', err);
})

db.once('open', ()=> {
    console.log('connected to DB')
})

const bidSchema = mongoose.Schema({
    user_id: String,
    user_name: String,
    bid_price: Number,
    item_id: String
});

const itemSchema = mongoose.Schema({
    name: String,
    image_url: String,
    expiringTime: String,
    starting_price: Number,
    latest_bid_id: String,
    latest_bid: Number,
    latest_bidder: String,
    bids: [bidSchema]
  });

const userSchema = mongoose.Schema({
    name: String,
    password: String
});

const Item = mongoose.model('Item', itemSchema, 'items');
const User = mongoose.model('User', userSchema, 'users');
const Bid = mongoose.model('Bid', bidSchema);

const insertItemToDB = (item) => {
    let newItem = new Item(item)
    newItem.save( (err, newItem)=>{} )
}

const insertMultipleItemsToDB =  (objectArray, callback) => {
    if (objectArray.length && callback) {
        return Item.insertMany(objectArray, function(err, data){
            if (err ) {
                console.log('error ', err)
            } else {
                callback(data)
            }
        })
    }
}
const insertMultipleUsersToDB =  (objectArray, callback) => {
    if (objectArray.length && callback) {
        return User.insertMany(objectArray, (err, data)=>{
            if (err ) {
                console.log('error ', err)
            } else {
                callback(data)
            }
        })
    }
}

const retrieveAllItems = (callback) => {
    Item.find( {}, (err, data) =>{
        if(err) {
            console.log('error retrieving all items', err) 
        } else {
            callback(data);
        }
    })
}

const retrieveAllUsers = (callback) => {
    User.find( {}, (err, data)=> {
        if(err) {
            console.log('error retrieving all items', err) 
        } else {
            callback(data);
        }
    })
}

const submitNewBid =  (bidData, callback) => {
    let newBid = new Bid(bidData);
    Item.findById(newBid.item_id,(err, item)=> {
        item.latest_bid_id = newBid._id;
        item.latest_bid = newBid.bid_price;
        item.latest_bidder = newBid.user_name;
        item.bids.push(newBid)
        item.save((err, updatedItem)=> {
            if(err) {
                console.log('err in updating item ', err)
            } else {
                callback(updatedItem)
            }
        })
    })
}

const checkUser = (userInfo, callback) => {
    User.findOne({'name': userInfo.username, 'password': userInfo.password},(err, res)=>{
        if(err) console.log('err finding user')
        else {
            if(res) {
                userInfo._id = res._id
                callback(userInfo)
            } else {
                callback(null)
            }
        }
    })
}

module.exports = {
    insertItemToDB,
    insertMultipleItemsToDB,
    insertMultipleUsersToDB,
    retrieveAllItems,
    retrieveAllUsers,
    submitNewBid,
    checkUser
};