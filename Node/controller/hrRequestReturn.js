const stockModel = require('../models/stock.js')
const requestModel = require('../models/request.js')
const returnModel = require('../models/return.js')
const employeeModel = require('../models/employee.js')
const itemModel = require('../models/item.js')
const ObjectId = require('mongodb').ObjectID;
const {successResponse , errorResponse} = require('../utils/responseFormat')

const requestHr = async (req,res,next) => {
    try {
        
        const itemName = req.body.itemName
        const hrId = req.body.employeeId
        const reason = req.body.reason
    
        let itemId,requestCloseTime
    
        const stockItem = await stockModel.findOneAndUpdate({
            itemName,
            availableQuantity : { $gt:0 }
        },
        {
            $inc : { 
                availableQuantity : -1,
                equippedQuantity : 1
            }
        })
    
        if(stockItem){
            let companyName = stockItem.companyName
            let itemObjectId 
            let item = await itemModel.findOne({itemName,companyName,employeeId:undefined})
           
            itemId = item.itemId
            itemObjectId = item.itemObjectId
            item.employeeId = new ObjectId(hrId)
            item.issuedDate = requestCloseTime = Date.now()
            await item.save()
    
            const newHrRequest = await new requestModel(
                {
                    employeeId:hrId,
                    itemName,
                    reason,
                    requestTime:requestCloseTime,
                    requestCloseTime,
                    status:1,
                    itemId,
                    hrId,
                    companyName,
                    itemObjectId
                }).save() 
    
                const result = {
                    employeeId:hrId,
                    itemName,
                    reason,
                    requestTime:requestCloseTime,
                    requestCloseTime,
                    status:1,
                    itemId,
                    hrId,
                    companyName,
                    itemObjectId
                }
                successResponse(req,res,result,"Request Successfully Completed")
            // return res.send({isError:false,})
        }
        else{
            errorResponse(req,res,'',"Inventory empty for this request",400)
            // return res.send("Item not available, wait till it becomes available")
    
        }
    } catch (error) {
        errorResponse(req,res,error)
    }

}

const returnHr = async (req,res,next) => {
    try {
        const itemName = req.body.itemName
        const companyName = req.body.companyName
        const itemId = req.body.itemId
        const employeeId = req.body.employeeId
        const condition = req.body.condition
        const reason = req.body.reason
        if(condition){
            const stockUpdate = await stockModel.findOneAndUpdate({itemName,companyName},{
                $inc : {
                    availableQuantity : 1,
                    equippedQuantity : -1
                }
            })
    
            const itemUpdate = await itemModel.findOneAndUpdate({itemName,companyName,itemId},{
                employeeId : undefined,
                issuedDate : undefined
            })
    
            const returnItem = await new returnModel({
                employeeId,
                itemName,
                companyName,
                reason,
                returnTime : Date.now(),
                condition,
                itemId
            }).save()
        
            successResponse(req,res,'Object is returned')
            // return res.send({isError:false,result:"successfulll"})
        }
        else{
            const stockUpdate = await stockModel.findOneAndUpdate({itemName,companyName},{
                $inc : {
                    equippedQuantity : -1,
                    garbageQuantity : 1
                }
            })
    
            const itemDelete = await itemModel.findOneAndDelete({itemName,itemId,companyName})
    
            console.log(itemDelete)
            
            const returnItem = await new returnModel({
                employeeId,
                itemName,
                companyName,
                reason,
                returnTime : Date.now(),
                condition,
                itemId
            }).save()
            successResponse(req,res,itemDelete,'Successfully Item Deleted')
            // return res.send({isError:false,result:"successfully item deleted"})
        }
    } catch (error) {
        errorResponse(req,res,error)
    }
    
}

module.exports = {requestHr,returnHr}