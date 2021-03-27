const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    availableQuantity:{
        type: Number,
        required: true   
    },
    equippedQuantity:{
        type: Number,
        default: 0
    },
    garbageQuantity:{
        type: Number,
        default:0
    }
});

userSchema.index({"itemName":1,"companyName":1},{unique:true})

const Stock = mongoose.model('stock', userSchema);

module.exports = Stock;