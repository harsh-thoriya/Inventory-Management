const express = require('express')
require('../db-connect')
const mongoose = require('mongoose')
// require('dotenv').config({path : '../.env'})

const requestModel = require('../models/request')
const returnModel = require('../models/return')
const employeeModel = require('../models/employee')
const itemSchema = require('../models/item')
const stockModel = require('../models/stock')
const { request } = require('express')
const { Mongoose } = require('mongoose')
const { findOne } = require('../models/stock')

// console.log(hr);
const requestHr = async function(req,res){
    try {
        const itemName = req.body.itemName
        const reason = req.body.reason
        // const hr = await employeeModel.findOne({isHr : true}) 
        // if(!hr){
        //     return console.log();
        //     }
        //     console.log(hr._id);
        //     const request = new requestModel({
        //         employeeId : hr._id,
        //         hrId: hr._id,
        //         itemName,
        //         reason,
        //         requestTime: Date.now(),
        //         requestCloseTime: Date.now()
        //     }
        // )
        // console.log("Before stock")
        // await stockModel.findOneAndUpdate({itemName, availableQuantity : {$gt:0}},{$inc : {availableQuantity : -1,equippedQuantity:1}})
        
        var test = itemName+'.companyName';
        var test1 = itemName+'.mouseId';
        const itemModel = mongoose.model("item", itemSchema);
        var itemId
        console.log("before update");
        var test2 = itemName+'.employeeID'
        var test3= itemName+'.issuedAt'
        var test4 = itemName+'._id'
        console.log(test4)

        const itemFound = await itemModel.findOne({[test]:'hp'});
        const {mouse} = itemFound._doc
        const findData = mouse[0]._id;
        console.log("~findData", findData)

        const itemmmmdone = await itemModel.findOne({[test4]:findData});
        console.log("itemmmmdone",itemmmmdone);
        res.send(itemmmmdone);

        // const itemf= await itemModel.findOneAndUpdate({[test4]:findData},{[test1]:12})
        // console.log("Here",itemf);
        // res.send(itemFound)
        // if(!itemFound){
        //     throw new Error('Error here')
        // }  else{
        //         console.log('Here');
        //         console.log(itemFound);
        //         // itemId = itemFound._doc[itemName][0]._id
        //         // console.log(itemId);
        // }
        // const itemFound = await itemModel.findOne({[itemName]:{$elemMatch :{_id:'605449b61bdc1f18dc3c940d'}}});
        // console.log('After Update');
        // if(!itemFound){
        //     throw new Error('Error here')
        // }  else{
        //         // itemId = itemFound._doc[itemName][0]._id
        //         // console.log(itemId);
        //         console.log(itemFound);
        // }
        // const result = await request.save()
        // res.status(200).send({isError:false,itemFound})
    } catch (error) {
        console.log(error)
        res.status(400).send({isError : true,result: error})
    }    
}

const returnHr =async function(req,res){
    try {

        const { itemName, reason, condition, companyName } = req.body
        const hr = await employeeModel.findOne({isHr : true}) 
        if(!hr){
            return console.log();
            }
        console.log(hr._id);
        const returnItem = new returnModel({
            employeeId : hr._id,
            itemName,
            companyName,
            reason,
            condition,
            returnTime: Date.now(),
            serialNumber: 9 ,
        }
    )
        const result = await returnItem.save()
        res.status(200).send({isError:false,result})
    } catch (error) {
        res.status(400).send({isError: true, result: error})
    }
}

module.exports = {requestHr,returnHr}