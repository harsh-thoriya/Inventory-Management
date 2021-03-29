const itemModel = require('../models/item.js')
const ObjectId = require('mongodb').ObjectID;
const response = require('../utils/responseFormat.js')

const getEquippedItems = async (req,res,next) => {

    try{

        const equippedItems = await itemModel.find({employeeId : {$ne : undefined}})
        response.successResponse(req, res, data = equippedItems)

    }
    catch(e){

        response.errorResponse(req, res, "error occurred while dashboard", code = 500, e)

    }
    
}

module.exports = {getEquippedItems}