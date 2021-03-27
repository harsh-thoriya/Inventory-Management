const stockModel = require('../models/stock.js')
const itemModel = require('../models/item.js')
const ObjectId = require('mongodb').ObjectID;
const response = require('../utils/responseFormat.js')

const dashboard = async (req,res,next) => {

    const id = req.body.id
    
    try{
    
        const stockData = await stockModel.find({})
        
        const itemData = await itemModel.find({employeeId:new ObjectId(id)})

        response.successResponse(req, res, data = {
            stockData,
            itemData
        })
    }
    catch(e){
        response.errorResponse(req, res, "error occurred while dashboard", code = 500, e)
    }
}

module.exports = {dashboard}