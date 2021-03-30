const stockModel = require('../models/stock.js')
const itemModel = require('../models/item.js')
const response = require('../utils/responseFormat.js')
const mongoose = require('mongoose')

const addStock = async (req,res,next) => {

    //const session = await itemModel.startSession();

    let stockData = req.body
    const itemName = req.body.itemName
    const companyName = req.body.companyName
    const incomingQuantity = req.body.incomingQuantity

    try{
        var stockItem = await stockModel.find({$and :[{itemName},{companyName}]})

        if(stockItem.length>0){
            
            let itemId = stockItem[0]._doc.availableQuantity+stockItem[0]._doc.equippedQuantity+stockItem[0]._doc.garbageQuantity+1
            stockItem[0]._doc.availableQuantity = stockItem[0]._doc.availableQuantity + incomingQuantity
            await stockModel.updateOne({itemName,companyName},{'availableQuantity': stockItem[0]._doc.availableQuantity})

            let loopCount = stockItem[0]._doc.availableQuantity
                        
            for(let i=itemId;i<=loopCount;i++){
                await new itemModel({serialNumber:i,itemName,companyName}).save()
            }

            response.successResponse(req, res, data = null)

        }
        else{

            const stockItem = await new stockModel({
                itemName,
                companyName,
                availableQuantity:incomingQuantity
            }).save()

            for(let i=1;i<=incomingQuantity;i++){
                await new itemModel({serialNumber:i,itemName,companyName}).save()
            }

            response.successResponse(req, res, data = null)

        }
        
    }
    catch(e){

        response.errorResponse(req, res, "error occurred while adding into inventory", code = 500, e)

    }

}

module.exports = {addStock}
