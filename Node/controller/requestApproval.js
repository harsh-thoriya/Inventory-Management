const stockModel = require('../models/stock.js')
const requestModel = require('../models/request.js')
const itemModel = require('../models/item.js')
const ObjectId = require('mongodb').ObjectID;


const requestApproval = async (req,res,next) => {

    console.log(req.body) //employeeId, itemName
    const itemName = req.body.itemName
    const hrId = req.body.employeeId
    const employeeId = req.body.employeeId
    const requestObjectId = req.body.requestObjectId

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
                itemArray.items[i].employeeId = new ObjectId(employeeId)
                itemArray.items[i].issuedDate = requestCloseTime = Date.now()
                serialNumber = itemArray.items[i].itemId
                itemObjectId = itemArray.items[i]._id
                break
            }
           
        }
        
        await itemArray.save()

        const updateRequest = await requestModel.findOneAndUpdate({
            _id:new ObjectId(requestObjectId)},
            {
                requestCloseTime,
                status:1,
                serialNumber,
                hrId,
                companyName,
                itemObjectId
            }) 

        return res.send({isError:false,result:{serialNumber,requestCloseTime,itemName,companyName,itemObjectId}})
    }
    else{

        return res.send("Item not available, wait till it becomes available")

    }

}

const requestRejection = async (req,res,next) => {
    const requestObjectId = req.body.requestObjectId
    const hrId = req.body.hrId

    const updateRequest = await requestModel.findOneAndUpdate({
        _id:new ObjectId(requestObjectId)},
        {
            requestCloseTime : Date.now(),
            status:2,
            hrId
        }) 

    return res.send({isError:false,result:"Successfully rejected"})
}

module.exports = {requestApproval,requestRejection}