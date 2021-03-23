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

        // for(let i=0;i<itemArray.items.length;i++){
            
        //     if(!itemArray.items[i].employeeId){
        //         serialNumber = itemArray.items[i].itemId
        //         itemObjectId = itemArray.items[i]._id
        //         break
        //     }
           
        // }
        
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

        return res.send({isError:false,result:{
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
        }})
    }
    else{

        return res.send("Item not available, wait till it becomes available")

    }

}

const returnHr = async (req,res,next) => {

    const itemName = req.body.itemName
    const companyName = req.body.companyName
    const itemId = req.body.itemId
    const employeeId = req.body.employeeId
    const condition = req.body.condition
    const reason = req.body.reason
    if(condition){
        // const stockUpdate = await stockModel.updateOne({$and :[{itemName},{companyName}]},{
        //     $inc : { 
        //         availableQuantity : 1,
        //         equippedQuantity : -1
        //     }
        // })
        const stockUpdate = await stockModel.findOneAndUpdate({itemName,companyName},{
            $inc : {
                availableQuantity : 1,
                equippedQuantity : -1
            }
        })

        // const itemUpdate = await itemModel.updateOne(
        //     { itemName: itemName, items: { $elemMatch: { companyName , itemId:serialNumber } } },
        //     {
        //         $set: {
        //             "items.$.employeeId": undefined,
        //             "items.$.issuedDate": undefined
        //         }
        //     }
        // )
        
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
    
        return res.send({isError:false,result:"successfulll"})
    }
    else{

        // const stockUpdate = await stockModel.updateOne({$and :[{itemName},{companyName}]},{
        //     $inc : { 
        //         equippedQuantity : -1
        //     }
        // })
        
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
        
        return res.send({isError:false,result:"successfully item deleted"})
    }
    
}

module.exports = {requestHr,returnHr}