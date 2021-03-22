const mongoose = require('mongoose')

const schema = mongoose.Schema;

const items = new schema({
    itemName:{
        type:String
    },
    items:[
        {
            employeeId : mongoose.Schema.Types.ObjectId,
            itemId : Number,
            issuedDate : Date,
            companyName : String 
        }
    ]
})

module.exports = mongoose.model('item',items)
//mongoose.model('book', books);