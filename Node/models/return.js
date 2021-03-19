const mongoose = require('mongoose')

const retSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: "Employee" //modelname
    },
    itemName:{
        type: String,
        required:true
    },
    companyName:{
        type: String,
        //required: true
    },
    reason:{
        type: String,
        required:true
    },
    returnTime : {
        type:Date,  
        //required: true
    },
    condition: {
        type:Boolean,
        required: true
    },
    serialNumber:{
        type: Number,
        //required:true
    }
})

const Return = mongoose.model('return', retSchema)

module.exports = Return