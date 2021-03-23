const mongoose = require('mongoose')

const reqSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: "Employee" //modelname
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: "Employee" //modelname
    },
    itemName: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    requestTime: {
        type: Date,
        //required: true
    },
    requestClosetime: {
        type: Date,
        // required: true
    },
    status: {
        default: 0,
        //required: true,
        type: Number
    },
    serialNumber: {
        type: Number
    }
})

const Request = mongoose.model('request', reqSchema)

module.exports = Request