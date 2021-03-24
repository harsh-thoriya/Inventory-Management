const express = require('express')
const mongoose=require('mongoose')
const Request = require('../models/request')
const Return = require('../models/return')
const Stock = require('../models/stock')
const Item = require('../models/item')
const responseFormat = require("../utils/responseFormat")
//return item request
module.exports.return_post = async (req, res) => {
    const employeeId = req.employee._id;
    const itemName = req.body.itemName;
    const reason = req.body.reason;
    const companyName = req.body.companyName;
    const condition = req.body.condition;
    const serialNumber = req.body.itemId
    //console.log(itemId)

    const data = new Return({
        employeeId: employeeId,
        itemName: itemName,
        reason: reason,
        condition: condition,
        companyName: companyName,
        serialNumber : serialNumber
    })

    if(condition){
      
        const stockUpdate = await Stock.findOneAndUpdate({itemName,companyName},{
            $inc : {
                availableQuantity : 1,
                equippedQuantity : -1
            }
        })
        const itemUpdate = await Item.findOneAndUpdate({itemName,companyName,itemId:serialNumber},{
            employeeId : undefined,
            issuedDate : undefined
        })
        try {
            await data.save()
            res.send({ data, stockUpdate, itemUpdate })
            //responseFormat.successResponse(req,res,data = { stockUpdate, itemUpdate})
        }
        catch (e) {
            res.send(e)

        }
    }
    else{
        const stockUpdate = await Stock.findOneAndUpdate({itemName,companyName},{
            $inc : {
                equippedQuantity : -1,
                garbageQuantity : 1
            }
        })

        const itemDelete = await Item.findOneAndDelete({itemName,itemId:serialNumber,companyName})

        try {
            await data.save()
            //res.render('employee/return')
            res.send({ data, stockUpdate, itemUpdate })
        }
        catch (e) {
            res.send(e)
        }

        console.log(itemDelete)
    }

}

//get all item request
module.exports.request_get = async (req, res) => {
    const pending_item = await Request.find({ employeeId: req.employee._id,status:0 })
    const equipped_item = await Request.find({employeeId: req.employee._id,status:1})
    const reject_item = await Request.find({employeeId: req.employee._id,status:2})
    responseFormat.successResponse(req,res,data={pending_item,equipped_item,reject_item})
    //res.send({pending_item,equipped_item,reject_item})

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

        await data.save()
        res.send(data)
    }
    catch (e) {
        res.send(e)
    }
}

module.exports.request_item = async (req, res) => {
    const data = await new Item({
        itemId: req.body.itemId,
        serialNumber: req.body.serialNumber
    })
    console.log(data)
    try {
        await data.save()
        res.send(data)
    }
    catch (e) {
        res.send(e)
    }

}