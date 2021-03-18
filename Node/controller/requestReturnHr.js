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
        if(!hr){
            return console.log();
            }
            console.log(hr._id);
            const request = new requestModel({
                employeeId : hr._id,
                hrId: hr._id,
                itemName,
                reason,
                requestTime: Date.now(),
                requestCloseTime: Date.now(),
                status: 1 ,
                serialNumber: 9 ,
            }
        )
        const result = await request.save()
        res.status(200).send({isError:false,result})
    } catch (error) {
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