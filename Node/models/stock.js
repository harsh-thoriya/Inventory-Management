const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    iteamName:{
        type: String,
        require: true
    },
    companyName:{
        type: String,
        require: true
    },
    availableQuantity:{
        type: Number,
        require: true   
    },
    equippedQuantity:{
        type: Number,
        require: true
    }
});

const Stock = mongoose.model('stock', userSchema);



module.exports = Stock;