const stockModel = require('../models/stock.js')
const itemModel = require('../models/item.js')
const ObjectId = require('mongodb').ObjectID;

const dashboard = async (req,res,next) => {

    const id = req.body.id

    const stockData = await stockModel.find({})
    
    const itemData = await itemModel.find({employeeId:new ObjectId(id)})

    res.send({isError:false,result:{
        stockData,
        itemData
    }})
}

module.exports = {dashboard}