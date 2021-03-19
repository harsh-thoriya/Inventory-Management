const express = require('express')
const Request = require('../models/request')
const Return = require('../models/return')


// module.exports.return_get = (req,res)=>{
//     res.render('employee/return')
// }

//return item request
module.exports.return_post = async (req, res) => {
    const data = await new Return({
        employeeId: req.employee._id,
        itemName: req.body.items,
        reason: req.body.reason,
        condition: req.body.condition

    })
    try {
        await data.save()
        //res.render('employee/return')
        res.send({ data })
    }
    catch (e) {
        res.send({ isError: true, e })
    }

}

// module.exports.request_get = (req, res) => {
//     res.render('employee/request')
// }


//get all item request
module.exports.request_get = async (req, res) => {
    const data = await Request.find({ employeeId: req.employee._id })
    res.send(data)

}

//request item to hr
module.exports.request_post = async (req, res) => {
    const data = await new Request({
        employeeId: req.employee._id,
        itemName: req.body.items,
        reason: req.body.reason,
        requestTime: Date.now()
    })
    console.log(data);
    try {
        await data.save()
        //res.render('employee/request')
        res.send({ data })
    }
    catch (e) {
        res.send(e)
    }
}

//delete pending request
module.exports.request_delete = async (req, res) => {
    const data = await Request.deleteOne({ employeeId: req.employee._id, status: 0 })
    console.log(data)
    try {

        //await data.save()
        res.send(data)
    }
    catch (e) {
        res.send(e)
    }
}