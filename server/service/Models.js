const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: String, required: true}
    },
    phoneNumber: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isAdmin: {type:Boolean, required:false},
});

const OrderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
    items: [{
        "type":{type:String, required:true},
        "option":{type:String, required:false},
        "priceType":{type:String, required:false},
        price: {type: Number, required: true},
        q: {type: Number, required: true},
        byAdmin: {type:Boolean, default: false}
    }],
    comment: {type: String},
    isDone: {type: Boolean, default: false},
    isPaid: {type: Boolean, default: false}
}, { timestamps: true });

const itemSchema = new mongoose.Schema({
    category:{type:String, required:true},
    name: {type:String, required:true},
    prices: [Number],
    pricesTypes: [String],
    options: [String]
}, {
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
 });

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
    items:[
        {
            category:{type:String, required:true},
            name: {type:String, required:true},
            price:{type:Number, required:true},
            priceType: {type:String},
            option: {type:String},
            q: {type:Number, required:true}
        }
    ]
}, {
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
 })

module.exports = {
    User:  mongoose.models.Users || mongoose.model('Users', userSchema),
    Order: mongoose.models.Orders || mongoose.model('Orders', OrderSchema),
    Item:  mongoose.models.Items || mongoose.model('Items', itemSchema),
    Cart:  mongoose.models.Carts || mongoose.model('Carts', cartSchema),
} 