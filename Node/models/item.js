const mongoose = require('mongoose')

const schema = mongoose.Schema;

const items = new schema({
    itemName : {
        type : String,
        required : true,
        index : true
    },
    employeeId : {
        type : mongoose.Schema.Types.ObjectId,
        default : undefined,
        ref : 'employee'
    },
    serialNumber : {
        type : Number,
        required : true
    },
    issuedDate : {
        type : Date,
        default : undefined
    },
    companyName : {
        type : String,
        required : true
    },
    usable:{
        type : String,
        default : true
    }
})

module.exports = mongoose.model('item',items)