const stockModel = require('../models/stock.js')
const requestModel = require('../models/request.js')
const returnModel = require('../models/return.js')
const employeeModel = require('../models/employee.js')
const itemModel = require('../models/item.js')
const ObjectId = require('mongodb').ObjectID;

const requestHr = async (req,res,next) => {

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
        let itemObjectId 
        let itemArray = await itemModel.findOne({itemName,'items.companyName':companyName})
       
        for(let i=0;i<itemArray.items.length;i++){
            
            if(!itemArray.items[i].employeeId){
                itemArray.items[i].employeeId = new ObjectId(hrId)
                itemArray.items[i].issuedDate = requestCloseTime = Date.now()
                serialNumber = itemArray.items[i].itemId
                itemObjectId = itemArray.items[i]._id
                break
            }
           
        }
        
        await itemArray.save()

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
                companyName,
                itemObjectId
            }).save() 

        return res.send({isError:false,result:{
            employeeId:hrId,
            itemName,
            reason,
            requestTime:requestCloseTime,
            requestCloseTime,
            status:1,
            serialNumber,
            hrId,
            companyName,
            itemObjectId
        }})
    }
    else{

        return res.send("Item not available, wait till it becomes available")

    }

}

const returnHr = async (req,res,next) => {

    const itemName = req.body.itemName
    const companyName = req.body.companyName
    const serialNumber = req.body.serialNumber
    const employeeId = req.body.employeeId
    const condition = req.body.condition
    const reason = req.body.reason
    if(condition){
        const stockUpdate = await stockModel.updateOne({$and :[{itemName},{companyName}]},{
            $inc : { 
                availableQuantity : 1,
                equippedQuantity : -1
            }
        })
    
        const itemUpdate = await itemModel.updateOne(
            { itemName: itemName, items: { $elemMatch: { companyName , itemId:serialNumber } } },
            {
                $set: {
                    "items.$.employeeId": undefined,
                    "items.$.issuedDate": undefined
                }
            }
        )
        
        const returnItem = await new returnModel({
            employeeId,
            itemName,
            companyName,
            reason,
            returnTime : Date.now(),
            condition,
            serialNumber
        }).save()
    
        return res.send({isError:false,result:"successfulll"})
    }
    else{

        const stockUpdate = await stockModel.updateOne({$and :[{itemName},{companyName}]},{
            $inc : { 
                equippedQuantity : -1
            }
        })
    
        const itemDelete = await itemModel.updateOne({itemName},
            { $pull: { items: { itemId:serialNumber, companyName } } } 
        )

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
        
        return res.send({isError:false,result:"successfully item deleted"})
    }
    
}

module.exports = {requestHr,returnHr}