const mongoose = require('mongoose')

const reqSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: "Employee" //modelname
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
        
        //required: true
    },
    requestCloseTime : {
        type:Date,
       // required: true
    },
    status:{
        default:0,
        //required: true,
        type:Number
    },
    serialNumber:{
        type: Number
    },
    hrId:{
        type: mongoose.Schema.Types.ObjectId
    }
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })



const Request = mongoose.model('request', reqSchema)

module.exports = Request

