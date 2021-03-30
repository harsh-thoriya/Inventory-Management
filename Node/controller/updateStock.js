const stockModel = require('../models/stock.js')
const itemModel = require('../models/item.js')
const ObjectId = require('mongodb').ObjectID;
const response = require('../utils/responseFormat.js')
const requestModel = require('../models/request.js')
const returnModel = require('../models/return.js')

const updateStock = async (req,res,next) => {

    const stockObjectId = req.body.stockObjectId //submit button should have this object Id as it's id , can be done with javascript
    const itemName = req.body.itemName
    const companyName = req.body.companyName

    try{

        const updatedStock = await stockModel.findOneAndUpdate({_id:new ObjectId(stockObjectId)}, {itemName,companyName})
        const itemUpdate = await itemModel.updateMany(
            { itemName:updatedStock.itemName, companyName:updatedStock.companyName },
            { itemName, companyName }
         )
        const requestUpdate = await requestModel.updateMany(
            { itemName:updatedStock.itemName, companyName:updatedStock.companyName },
            { itemName, companyName }
         )
        const returnModel = await returnModel.updateMany(
            { itemName:updatedStock.itemName, companyName:updatedStock.companyName },
            { itemName, companyName }
         )

        response.successResponse(req, res, data = {itemName,companyName})
        
    }
    catch(e){

        response.errorResponse(req, res, e, "similar item name and company name may exist or try again in a while", code = 500)

    }

}

module.exports = {updateStock}