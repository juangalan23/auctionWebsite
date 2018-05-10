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
    user_id: Number,
    user_name: String,
    bid_price: Number,
    item_id: Number
});

const itemSchema = mongoose.Schema({
    name: String,
    image_url: String,
    owner_id: Number,
    starting_price: Number,
    latest_bid_id: Number,
    latest_bid: Number,
    bids: [bidSchema]
  });

const itemModel = mongoose.model('Item', itemSchema);

const insertItemToDB = (item) => {
    let newItem = new itemModel(item)
    newItem.save( (err, newItem)=>{} )
}

const insertMultipleItemsToDB = (objectArray) => {
    console.log('object array ',objectArray)
    if (objectArray.length) {
        // let insertArray = [];
        // objectArray.forEach(element => {
        //     let newItem = new itemModel();
        //     newItem.name = element.name;
        //     newItem.image_url = element.image_url;
        //     newItem.owner_id = element.owner_id;
        //     newItem.starting_price = element.starting_price;
        //     newItem.latest_bid_id = element.latest_bid_id;
        //     newItem.latest_bid = element.latest_bid;
        //     newItem.bids = element.bids;
        //     insertArray.push(newItem);
        // });
        // console.log('cleaned data array ', insertArray);
        return itemModel.create(objectArray, (err, itemModel)=> {
            if (err){
                console.log('err in inserting item to mongodb ', err);
            }
        })
        
    }
}

module.exports = {
    insertItemToDB,
    insertMultipleItemsToDB
};