const express = require('express')
require('../db-connect')
// require('dotenv').config({path : '../.env'})

const requestModel = require('../models/request')
const returnModel = require('../models/return')
const employeeModel = require('../models/employee')
const { request } = require('express')
const { Mongoose } = require('mongoose')

// console.log(hr);
const requestHr = async function(req,res){
    try {
        const itemName = req.body.itemName
        const reason = req.body.reason
        const hr = await employeeModel.findOne({isHr : true})
        const 
        if(!hr){
            return console.log();
            }
            console.log(hr._id);
            const request = new requestModel({
                employeeId : hr._id,
                itemId: new ObjectID(),
                itemName,
                reason,
                requestTime: Date.now(),
                requestCloseTime: Date.now(),
                status: 1 ,
                serialNumber: 9 ,
            }
        )
        console.log("HIiii");
        const result = await request.save()
        console.log(result);
        res.status(200).send({isError:false,result})
    } catch (error) {
        res.status(400).send({isError : true,result: error})
    }    
}

const returnHr = function(){
    
}
// requestHr()
module.exports = {requestHr,returnHr}