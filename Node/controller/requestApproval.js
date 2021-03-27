const stockModel = require('../models/stock.js')
const requestModel = require('../models/request.js')
const itemModel = require('../models/item.js')
const ObjectId = require('mongodb').ObjectID;
const response = require('../utils/responseFormat.js')

const requestApproval = async (req,res,next) => {

    console.log(req.body) 
    const itemName = req.body.itemName
    const hrId = req.body.employeeId
    const employeeId = req.body.employeeId
    const requestObjectId = req.body.requestObjectId

    let serialNumber,requestCloseTime

    try {

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
            let item = await itemModel.findOneAndUpdate({itemName,companyName,employeeId:undefined},{
                employeeId : new ObjectId(employeeId),
                issuedDate : Date.now()
            })
            requestCloseTime = Date.now()
            serialNumber = item.serialNumber
           
            //for(let i=0;i<itemArray.items.length;i++){
            //    
            //    if(!itemArray.items[i].employeeId){
            //        itemArray.items[i].employeeId = new ObjectId(employeeId)
            //        itemArray.items[i].issuedDate = requestCloseTime = Date.now()
            //        serialNumber = itemArray.items[i].itemId
            //        itemObjectId = itemArray.items[i]._id
            //        break
            //    }
            //   
            //}
            
            //await itemArray.save()
    
            const updateRequest = await requestModel.findOneAndUpdate({
                _id:new ObjectId(requestObjectId)},
                {
                    requestCloseTime,
                    status:1,
                    serialNumber,
                    hrId,
                    companyName
                }) 
    
            response.successResponse(req, res, data = {serialNumber,requestCloseTime,itemName,companyName})
        }
        else{
    
            response.errorResponse(req, res, error = "none" , errorMessage = "Item not available, wait till it becomes available", code = 500)
    
        }
        
    } catch (e) {
        
        response.errorResponse(req, res, "error while request approval", code = 500, e)

    }

}

const requestRejection = async (req,res,next) => {
    const requestObjectId = req.body.requestObjectId
    const hrId = req.body.hrId

    try{
        const updateRequest = await requestModel.findOneAndUpdate({
            _id:new ObjectId(requestObjectId)},
            {
                requestCloseTime : Date.now(),
                status:2,
                hrId
            }) 
    
            response.successResponse(req, res, data = null)
    }
    catch(e){

        response.errorResponse(req, res, "error occurred while request rejection", code = 500, e)

    }
    
}

module.exports = {requestApproval,requestRejection}