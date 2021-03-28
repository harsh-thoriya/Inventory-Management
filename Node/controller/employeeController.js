const express = require('express')
const mongoose=require('mongoose')
const Request = require('../models/request')
const Return = require('../models/return')
const Stock = require('../models/stock')
const Item = require('../models/item')
const response = require('../utils/responseFormat')
//return item request
module.exports.return_post = async (req, res) => {
    const employeeId = req.employee._id;
    const itemName = req.body.itemName;
    const reason = req.body.reason;
    const companyName = req.body.companyName;
    const condition = req.body.condition;
    const serialNumber = req.body.serialNumber
    //console.log(serialNumber)

    const data = new Return({
        employeeId: employeeId,
        itemName: itemName,
        reason: reason,
        condition: condition,
        companyName: companyName,
        serialNumber
    })

    if(condition=="1"){
      console.log(condition)
        const stockUpdate = await Stock.findOneAndUpdate({itemName,companyName},{
            $inc : {
                availableQuantity : 1,
                equippedQuantity : -1
            }
        })
        const itemUpdate = await Item.findOneAndUpdate({itemName,companyName,serialNumber},{
            employeeId : undefined,
            issuedDate : undefined
        })


        try {
            await data.save()
            await Request.findOneAndUpdate({itemName,companyName,serialNumber,serialNumber,status:1},
                {
                    status:3
                })
            //res.send({ data, stockUpdate, itemUpdate })
            response.successResponse(req,res,{data,stockUpdate,itemUpdate})
        }
        catch (e) {
            response.errorResponse(req, res, e)
        }
    }
    else{
        const stockUpdate = await Stock.findOneAndUpdate({itemName,companyName},{
            $inc : {
                equippedQuantity : -1,
                garbageQuantity : 1
            }
        })

        const itemDelete = await Item.findOneAndDelete({itemName,serialNumber,companyName})
        
        try {
            await data.save()
            await Request.findOneAndUpdate({itemName,companyName,serialNumber,serialNumber,status:1},
                {
                    status:3
                })
            response.successResponse(req,res,{data,stockUpdate,itemDelete})
        }
        catch (e) {
            response.errorResponse(req, res, e)
        }
    }

}

//get all item request
module.exports.request_get = async (req, res) => {
    const pending_item = await Request.find({ employeeId: req.employee._id,status:0 })
    const equipped_item = await Request.find({employeeId: req.employee._id,status:1})
    const reject_item = await Request.find({employeeId: req.employee._id,status:2})
    response.successResponse(req,res,{pending_item,equipped_item,reject_item})

}

//request item to hr
module.exports.request_post = async (req, res) => {
    const data = await new Request({
        employeeId: req.employee._id,
        itemName: req.body.items,
        reason: req.body.reason,
        requestTime: Date.now()
    })
    try {
        await data.save()
        response.successResponse(req,res,data,"Request added successfully")
    }
    catch (e) {
        response.errorResponse(req, res, e)
    }
}

//delete pending request
module.exports.request_delete = async (req, res) => {
    const data = await Request.deleteOne({ employeeId: req.employee._id, status: 0 })
    try {

        //await data.save()
        response.successResponse(req,res,data,"Request delete successfully")
    }
    catch (e) {
        response.errorResponse(req, res, e)
    }
}

