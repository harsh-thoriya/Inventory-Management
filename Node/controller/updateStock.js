const stockModel = require('../models/stock.js')
const ObjectId = require('mongodb').ObjectID;

const updateStock = (req,res,next) => {

    const stockObjectId = req.body.stockObjectId //submit button should have this object Id as it's id , can be done with javascript
    const itemName = req.body.itemName
    const companyName = req.body.companyName

    try{

        const updatedStock = await stockModel.updateOne({_id:new ObjectId(stockObjectId)}, {itemName,companyName})

        response.successResponse(req, res, data = null)
        
    }
    catch(e){

        response.errorResponse(req, res, "error occurred while dashboard", code = 500, e)

    }

}

module.exports = {updateStock}