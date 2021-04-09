const mongoose = require('mongoose')


const retSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "employee" 
    },
    reason:{
        type: String,
        required:true
    },
    returnTime : {
        type:Date,
        required: true
    },
    condition: {
        type:Boolean,
        required: true
    },
    item : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "item" 
    }
})

const Return = mongoose.model('return', retSchema)

module.exports = Return