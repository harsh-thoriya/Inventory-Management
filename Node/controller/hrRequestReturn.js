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
    
        let serialNumber,requestCloseTime
    
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
            let item = await itemModel.findOne({itemName,companyName,employeeId:undefined})
           
            serialNumber = item.serialNumber
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
                    serialNumber,
                    hrId,
                    companyName
                }).save() 
    
                const result = {
                    employeeId:hrId,
                    itemName,
                    reason,
                    requestTime:requestCloseTime,
                    requestCloseTime,
                    status:1,
                    serialNumber,
                    hrId,
                    companyName
                }

                successResponse(req,res,result,"Request Successfully Completed")
        
        }
        else{

            errorResponse(req,res,'',"Inventory empty for this request",400)
    
        }
    } catch (error) {

        errorResponse(req,res,error)

    }

}

const returnHr = async (req,res,next) => {
    try {
        const itemName = req.body.itemName
        const companyName = req.body.companyName
        const serialNumber = req.body.serialNumber
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
    
            const itemUpdate = await itemModel.findOneAndUpdate({itemName,companyName,serialNumber},{
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
                serialNumber
            }).save()
        
            successResponse(req,res,'Object is returned')
            
        }
        else{
            const stockUpdate = await stockModel.findOneAndUpdate({itemName,companyName},{
                $inc : {
                    equippedQuantity : -1,
                    garbageQuantity : 1
                }
            })
    
            const itemDelete = await itemModel.findOneAndDelete({itemName,serialNumber,companyName})
    
            console.log(itemDelete)
            
            const returnItem = await new returnModel({
                employeeId,
                itemName,
                companyName,
                reason,
                returnTime : Date.now(),
                condition,
                serialNumber
            }).save()
            successResponse(req,res,itemDelete,'Successfully Item Deleted')
            // return res.send({isError:false,result:"successfully item deleted"})
        }
    } catch (error) {
        errorResponse(req,res,error)
    }
    
}

module.exports = {requestHr,returnHr}