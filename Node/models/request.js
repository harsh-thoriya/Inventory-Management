const mongoose = require('mongoose')

const reqSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'employee'
    },
    itemName:{
        type: String,
        required:true
    },
    reason:{
        type: String,
        required:true
    },
    requestTime : {
        type:Date,
        required: true
    },
    requestCloseTime : {
        type:Date,
        default : undefined
    },
    status:{
        default:0,
        type:Number
    },
    hrId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'employee'
    },
    item :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "item" 
    }
})

const Request = mongoose.model('request', reqSchema)

module.exports = Request

